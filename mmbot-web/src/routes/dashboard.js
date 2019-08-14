const express = require('express');
const router = module.exports = express.Router();
const fetch = require('node-fetch');
const btoa = require('btoa');
const replaceString = require('replace-string');
const { bindUserInfo, getGuildInfo, canIManageThisGuild, validateGuildRoute } = require('../util.js');

// router.use((req, res) => res.status(501).send('Why are you here? You bypassed my client-side obstacles? Don\'t. Do. That. (http 501) '));

router.get('/', async (req, res) => {
    if (!req.session.user) return res.redirect('/dashboard/login');
    res.redirect('/dashboard/guilds');
});

router.get('/login', async (req, res) => {
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.uri + 'dashboard/callback')}&response_type=code&scope=identify%20guilds`);
});

router.get('/callback', async (req, res) => {
    if (!req.query.code) return res.sendStatus(400);
    const creds = btoa(`${config.clientId}:${config.clientSecret}`);
    const apiResponse = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${encodeURIComponent(config.uri + 'dashboard/callback')}`, 
    {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${creds}`,
            'User-Agent': 'mmbot (https://github.com/jellz/mmbot)',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const json = await apiResponse.json();
    if (json.error) return res.sendStatus(500);
    req.session.user = { accessToken: json.access_token };
    res.redirect('/dashboard/guilds');
});

// The next routes can only be accessed by authenticated users
router.use((req, res, next) => {
    if (!req.session.user) return res.status(401).redirect('/dashboard/login');
    next();
});

router.use((req, res, next) => {
    bindUserInfo(req, req.session.user.accessToken);
    next();
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/'); 
});

router.get('/guilds', async (req, res) => {
    if (req.query.guild_id) return res.redirect('/dashboard/guild/' + req.query.guild_id + '/overview');
    const apiResponse = await fetch(`https://discordapp.com/api/users/@me/guilds`, 
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${req.session.user.accessToken}`,
            'User-Agent': 'mmbot (https://github.com/jellz/mmbot)'
        }
    });
    const json = await apiResponse.json();
    if (json.error) return res.sendStatus(500);
    const guilds = [];
    json.forEach(guild => {
        if (guild.owner == true || ((guild.permissions & 0x00000020) != 0)) {
            guild.iconUrl = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128` : 'https://cdn.discordapp.com/embed/avatars/0.png';
            guild.escapedName = replaceString(guild.name, '"', '');
            guild.escapedName = replaceString(guild.escapedName, "<", '');
            guild.escapedName = replaceString(guild.escapedName, ">", '');
            guilds.push(guild);
        }
    });
    res.render('dashboard/guilds', { user: req.discordUser, guilds });
});

router.get('/guild/:id', async (req, res) => {
    res.redirect(`/dashboard/guild/${req.params.id}/overview`);
});

router.get('/guild/:id/overview', async (req, res) => {
    if (!await validateGuildRoute(req, res)) return;
    res.render('dashboard/guild/overview', { user: req.discordUser, guild: req.guild });
});

router.get('/guild/:id/config', async (req, res) => {
    if (!await validateGuildRoute(req, res)) return;
    res.render('dashboard/guild/config', { user: req.discordUser, guild: req.guild });
});
const express = require('express');
const router = module.exports = express.Router();

router.get('/', async (req, res) => {
    res.redirect('/');
});

router.get('/invite', async (req, res) => {
    res.redirect('https://discordapp.com/oauth2/authorize?client_id=456721958592315404&permissions=8&scope=bot');
});

router.get('/community', async (req, res) => {
    res.redirect('https://discord.gg/CdaSWx6');
});

router.get('/github', async (req, res) => {
    res.redirect('https://github.com/jellz/mmbot');
});

router.get('/docs', async (req, res) => {
    res.redirect('https://danielg.gitbook.io/mmbot');
});
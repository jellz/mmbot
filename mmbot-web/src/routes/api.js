const express = require('express');
const router = module.exports = express.Router();
const fetch = require('node-fetch');
const btoa = require('btoa');
const replaceString = require('replace-string');
const { apiPort } = require('../../config.json');
const { bindUserInfo, getGuildInfo, canIManageThisGuild, validateGuildRoute } = require('../util.js');

// The next routes can only be accessed by authenticated users
router.use((req, res, next) => {
    if (!req.session.user) return res.status(401).json({ error: 'not authenticated' });
    next();
});

router.use((req, res, next) => {
    bindUserInfo(req, req.session.user.accessToken);
    next();
});


router.put('/guild/:id/prefix', async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'no guild id passed' });
    const guild = await getGuildInfo(req.params.id);
    if (!guild) return res.status(404).json({ error: 'invalid guild' });
    if (!await canIManageThisGuild(req.session.user.accessToken, req.params.id)) return res.sendStatus(403);
    console.log(req.body);
    if (!req.body.prefix) return res.status(400).json({ error: 'no prefix provided' });
    if (typeof req.body.prefix !== 'string') return res.status(400).json({ error: 'prefix must be a string' });
    if (req.body.prefix.length > 10) return res.status(400).json({ error: 'prefix must be no longer than 10 characters' });

    const apiResponse = await fetch(`http://localhost:${apiPort}/guild/${req.params.id}/prefix`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'prefix': req.body.prefix
        })
    });
    const json = await apiResponse.json();

    if (json.error) return res.json({ error: json.error });
    return res.json(json);  
});

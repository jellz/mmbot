const express = require('express');
const router = module.exports = express.Router();
const client = require('../../index.js');

router.get('/:id', async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'no guild id passed' });
    const guild = await client.guilds.get(req.params.id);
    if (!guild) return res.status(404).json({ guild: null });
    return res.json({ guild: guild });
});

router.get('/:id/owner', async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'no guild id passed' });
    const guild = await client.guilds.get(req.params.id);
    if (!guild) return res.status(404).json({ owner: null });
    return res.json({ owner: { id: guild.owner.user.id, username: guild.owner.user.username, tag: guild.owner.user.tag, discriminator: guild.owner.user.discriminator } });
});

router.put('/:id/prefix', async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'no guild id passed' });
    const guild = await client.guilds.get(req.params.id);
    if (!guild) return res.status(404).json({ error: 'invalid guild' });
    if (!req.body.prefix) return res.status(400).json({ error: 'no prefix provided' });
    if (typeof req.body.prefix !== 'string') return res.status(400).json({ error: 'prefix must be a string' });
    if (req.body.prefix.length > 10) return res.status(400).json({ error: 'prefix must be no longer than 10 characters' });

    guild.configs.update('prefix', req.body.prefix);
    res.json({ response: 'updated prefix, see prefix property', prefix: guild.configs.get('prefix') });
});

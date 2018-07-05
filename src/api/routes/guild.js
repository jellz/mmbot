const express = require('express');
const router = module.exports = express.Router();
const client = require('../../index.js');

router.get('/:id', async (req, res) => {
    if (!req.params.id) return res.sendStatus(400);
    const guild = await client.guilds.get(req.params.id);
    if (!guild) return res.status(404).json({ guild: null });
    return res.json({ guild: guild });
});

router.get('/:id/owner', async (req, res) => {
    if (!req.params.id) return res.sendStatus(400);
    const guild = await client.guilds.get(req.params.id);
    if (!guild) return res.status(404).json({ owner: null });
    return res.json({ owner: { id: guild.owner.user.id, username: guild.owner.user.username, tag: guild.owner.user.tag, discriminator: guild.owner.user.discriminator } });
});
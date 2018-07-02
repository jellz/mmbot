const express = require('express');
const router = module.exports = express.Router();
const client = require('../../index.js');

router.get('/stats', async (req, res) => {
    res.status(200).json({ guilds: client.guilds.size, users: client.users.size, totalCommands: client.commands.size, endCommands: client.commands.filter(c => c.permissionLevel !== 10).size, channels: client.channels.size });
});

router.get('/commands', async (req, res) => {
    res.status(200).json(client.commands.array());
});

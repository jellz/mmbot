const express = require('express');
const router = module.exports = express.Router();
const fetch = require('node-fetch');
const escapeHtml = require('escape-html');
const { getPermissionString } = require('../util.js');

router.get('/', async (req, res) => {
    const apiResponse = await fetch(`http://127.0.0.1:${config.apiPort}/client/commands`);
    const json = await apiResponse.json();
    const commands = [];
    json.forEach(c => {
        if (c.permissionLevel !== 9 && c.permissionLevel !== 10) {
            commands.push({
                usage: escapeHtml(c.name + ' ' + c.usage.usageString),
                description: escapeHtml(c.description),
                permission: getPermissionString(c.permissionLevel, false),
                category: escapeHtml(c.category)
            });
        }
    });
    
    res.render('commands', { commands });
});
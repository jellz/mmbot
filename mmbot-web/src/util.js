const fetch = require('node-fetch');
const replaceString = require('replace-string');
const config = require('../config.json');

exports.getPermissionString = (level, verbose = false) => {
    if (level == 10 || level == 9) return 'Bot Owner';
    if (level == 7) return 'Server Owner';
    if (level == 6) return `Server Manager${verbose ? ' (Manage Guild perm)' : ''}`;
    if (level == 5) return `Server Moderator${verbose ? ' (default: "mmbot moderator" role)' : ''}`;
    if (level == 4) return `Server DJ${verbose ? ' (default "DJ" role)' : ''}`;
    if (level == 0) return `Everyone`;
    return 'idk that perm level??';
}

exports.bindUserInfo = async (req, accessToken) => {
    const apiResponse = await fetch(`https://discordapp.com/api/users/@me`, 
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'mmbot (https://github.com/jellz/mmbot)'
        }
    });
    const json = await apiResponse.json();
    if (json.error) throw new Error('A Discord HTTP request in util#bindUserInfo() returned an error: ' + json.error);
    json.tag = json.username + '#' + json.discriminator;
    json.avatarUrl = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png?size=128`;
    return req.discordUser = json;
}

exports.getGuildInfo = async (id) => {
    const apiResponse = await fetch(`http://127.0.0.1:${config.apiPort}/guild/${id}`);
    const json = await apiResponse.json();
    if (json.error) throw new Error('An mmbot HTTP request in util#getGuildInfo() returned an error: ' + json.error);    
    if (!json.guild) return undefined;
    json.guild.iconUrl = json.guild.icon ? `https://cdn.discordapp.com/icons/${json.guild.id}/${json.guild.icon}.png?size=128` : 'https://cdn.discordapp.com/embed/avatars/0.png';
    json.guild.escapedName = replaceString(json.guild.name, '"', '');
    json.guild.escapedName = replaceString(json.guild.escapedName, "<", '');
    json.guild.escapedName = replaceString(json.guild.escapedName, ">", '');
    const anotherApiResponse = await fetch(`http://127.0.0.1:${config.apiPort}/guild/${id}/owner`);
    json.guild.owner = (await anotherApiResponse.json()).owner;
    return json.guild;
}

exports.canIManageThisGuild = async (accessToken, id) => {
    const apiResponse = await fetch(`https://discordapp.com/api/users/@me/guilds`, 
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'mmbot (https://github.com/jellz/mmbot)'
        }
    });
    const json = await apiResponse.json();
    if (json.error) throw new Error('A Discord HTTP request in util#canIManageThisGuild() returned an error: ' + json.error);
    let guild;
    await json.forEach(g => {
        if (g.id == id) {
            guild = g;
        }
    });
    return guild.owner == true || ((guild.permissions & 0x00000020) != 0);
}

exports.validateGuildRoute = async (req, res) => {
    if (!req.params.id) {
        res.sendStatus(400);
        return false;
    }
    const guild = await exports.getGuildInfo(req.params.id);
    // If the guild isn't a real guild anyway, Discord will handle it
    if (!guild) {
        res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.clientId}&permissions=8&redirect_uri=${encodeURIComponent('https://mm.jellz.fun/dashboard/guilds')}&scope=bot&guild_id=${req.params.id}&response_type=code`);
        return false;
    }
    if (!await exports.canIManageThisGuild(req.session.user.accessToken, req.params.id)) {
        res.sendStatus(403);
        return false;
    }
    req.guild = guild;
    return true;
}
module.exports = async () => {
    const express = require('express');
    const app = module.exports = express();
    const port = process.env.PORT || 4000;
    
    app.use(require('morgan')('dev'));
    app.use(require('helmet')());

    app.get('/', async (req, res) => {
        res.json({ response: 'mmbot api is responsive' });
    });

    app.use('/client', require('./routes/client.js'));
    app.use('/guild', require('./routes/guild.js'));


    await app.listen(port);
    console.log('[api] listening on port ' + port);
}
module.exports = async () => {
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

    const client = require('../index.js');

    app.get('/', (req, res) => {
        res.send(client.user.tag);
    });

    app.listen(port, () => { console.log('mmbot-web listening on port ' + port); });
}

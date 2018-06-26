module.exports = async () => {
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

    const client = require('../index.js');

    app.use(require('morgan')('dev'));
    app.use(require('helmet')());
    app.use(express.json());
    app.use('/assets', express.static('web/static'));

    app.use(require('./routes/index.js'));

    app.use((req, res) => { res.sendStatus(404); });

    app.listen(port, () => { console.log('web listening on port ' + port); });
}

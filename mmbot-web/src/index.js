const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const RDBStore = require('express-session-rethinkdb')(require('express-session'));
const rdbStore = new RDBStore({ connectOptions: { db: 'mmbot' }});

global.config = require('../config.json');

app.use(express.json());
app.use(require('morgan')('dev'));
app.use(require('helmet')());
app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: config.secret, store: rdbStore, cookie: { maxAge: 5.184e+8 } }));
app.use(express.json());
app.use('/assets', express.static('src/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('./routes/index.js'));
app.use('/commands', require('./routes/commands.js'));
app.use('/dashboard', require('./routes/dashboard.js'));
app.use('/api', require('./routes/api.js'));
app.use('/go', require('./routes/go.js'));
app.use((req, res) => { res.sendStatus(404); });

app.listen(port, () => { console.log('mmbot-web listening on port ' + port); });

process.on('unhandledRejection', (err, promise) => {
    console.error(err.stack);
});
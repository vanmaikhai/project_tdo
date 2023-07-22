const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
const socket = require('socket.io');
const PORT = process.env.PORT || 9999;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const db = require('./src/api/v1/models');
// db.sequelize.sync();

// const routes = require('./src/api/v1/routes/routes');
// routes(app);

app.get('/', (req, res) => {
    res.send({ message: 'TDO BE' });
});

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});

//socket

let server = app.listen(PORT, async (req, res) => {
    try {
        await connect();
    } catch (err) {
        console.log(err.message);
    }
    console.log(`Listening on ${PORT}`);
});

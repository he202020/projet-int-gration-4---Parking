const express = require('express');
const app = express();
const parkingRouter = require('./routes/parking');
const geolocationRouter = require('./routes/geolocation');
app.use(express.json());
require('dotenv').config();

app.listen(process.env.HTTP_PORT, () => {
    console.log(`listening on port ${process.env.HTTP_PORT}`);
});

app.get('/', async (request, response) => {
    response.status(200).send('hello world!');
});

app.use('/parking', parkingRouter);
app.use('/geolocation', geolocationRouter);
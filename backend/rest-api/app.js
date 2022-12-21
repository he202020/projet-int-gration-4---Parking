const express = require('express');
const app = express();
const parkingRouter = require('./routes/parking');
const geolocationRouter = require('./routes/geolocation');
const NumberCars = require('./routes/StatisticsUsingDay')
const AvailablePlace = require('./routes/AvailablePlace')

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

app.use('/NumberCars', NumberCars);
app.use('/AvailablePlace', AvailablePlace);


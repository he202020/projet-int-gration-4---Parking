const express = require('express');
const app = express();
const parkingRouter = require('./routes/parking');
const Reservation = require ('./routes/Reservation');
const Person = require ('./routes/Person');
const NumberPlate = require ('./routes/NumberPlate');

app.use(express.json());
require('dotenv').config();

app.listen(process.env.HTTP_PORT, () => {
    console.log(`listening on port ${process.env.HTTP_PORT}`);
});

app.get('/', async (request, response) => {
    response.status(200).send('hello world!');
});

app.use('/parking', parkingRouter);
app.use('/Reservation', Reservation);
app.use('/Person', Person);
app.use('/NumberPlate', NumberPlate);


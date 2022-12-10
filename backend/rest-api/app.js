const express = require('express');
const app = express();
const parkingRouter = require('./routes/parking');
const NumberCars = require('./routes/StatisticsUsingDay');
const AvailablePlace = require('./routes/AvailablePlace');
const signupRouter = require('./routes/signup');
const userRouter = require('./routes/user');
const signinRouter = require('./routes/signin');

app.use(express.json());
require('dotenv').config();

app.listen(process.env.HTTP_PORT, () => {
    console.log(`listening on port ${process.env.HTTP_PORT}`);
});

app.get('/', async (request, response) => {
    response.status(200).send('hello world!');
});

app.use('/parking', parkingRouter);
app.use('/NumberCars', NumberCars);
app.use('/AvailablePlace', AvailablePlace);
app.use('/signup', signupRouter);
app.use('/user', userRouter);
app.use('/signin', signinRouter);
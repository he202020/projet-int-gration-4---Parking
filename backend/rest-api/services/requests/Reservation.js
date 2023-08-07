const sqlConnection = require("../index");
const { json } = require("express");

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // Pour effectuer la requête POST

const app = express();
const port = 3000; // Port sur lequel le serveur Express écoutera

// In Reservation.js or the respective module file

const addReservation = async function (request, response) {
  try {
    await sqlConnection`INSERT INTO reservation (id, numberplate_id, parking_id, time) VALUES (${request.body.id},${request.body.numberplate_id},${request.body.parking_id},${request.body.time} )`;

    response.status(201).send("The reservation has been successfully created.");
  } catch (err) {
    response.status(400).send(err.message);
  }
};

const getReservation = async function (request, response) {
  try {
    const result = await sqlConnection`
            select * from reservation
        `;
    response.status(200).json(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

module.exports = { addReservation, getReservation };
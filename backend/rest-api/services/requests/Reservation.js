const sqlConnection = require("../index");
const { json } = require("express");

const express = require("express");
const router = express.Router();
//const fetch = require("node-fetch"); // Pour effectuer la requête POST



//ajouter une reservation

const addReservation = async function (request, response) {
  try {

    await sqlConnection `INSERT INTO reservation (numberplate_id, parking_id, day, start_time, end_time) VALUES (${request.body.numberplate_id},${request.body.parking_id},${request.body.day},${request.body.start_time},${request.body.end_time} )`;

    response.status(201).send("Réservation réussie.");
  } catch (err) {
    
    response.status(400).send(err.message);
  }
};

//afficher toutes les reservations 
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

module.exports = { addReservation,getReservation };

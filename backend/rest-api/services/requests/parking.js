/*const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getParking() {
  const allParking = await prisma.parking.findMany();
  console.log(allParking);
}

getParking()
  .then(async () => {
    await prisma.$disconnect();

  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });*/


const sqlConnection = require("../index");
const { json } = require("express");

const express = require("express");
const router = express.Router();
//const fetch = require("node-fetch"); // Pour effectuer la requête POST

//afficher tous les parkings

const getParking = async function (request, response) {
  try {
    const result = await sqlConnection`
              select * from parking
          `;
    response.status(200).json(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

/*exports.searchName = async function (request, response) {
    try {
        const result = await sqlConnection`
            select * from parking
            where parking_name ilike ${'%' + request.params.query + '%'}
            or parking_address ilike ${'%' + request.params.query + '%'}
        `;
        response.status(200).json(result);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
};*/

module.exports = { getParking };

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


  const { PrismaClient } = require("@prisma/client");
  const { request } = require("express");
  
  const prisma = new PrismaClient();
//const fetch = require("node-fetch"); // Pour effectuer la requête POST

//afficher tous les parkings

exports.getParking = async function (request, response) {
  try {
    const result = await prisma.parking.findMany()
    prisma.$disconnect();
    response.status(200).json(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

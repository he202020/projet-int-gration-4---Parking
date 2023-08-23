const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();
//const fetch = require("node-fetch"); // Pour effectuer la requête POST

//ajouter une reservation

/*const addReservation = async function (request, response) {
  try {
    await sqlConnection`INSERT INTO reservation (numberplateStr, parking_id, day, start_time, end_time) VALUES (${request.body.numberplateStr},${request.body.parking_id},${request.body.day},${request.body.start_time},${request.body.end_time} )`;

    response.status(201).send("Réservation réussie.");
  } catch (err) {
    response.status(400).send(err.message);
  }
};*/

exports.addReservation = async function addReservation(req, res) {
  const { numberplateStr, parking_id, day, start_time, end_time } = req.body;
  let plateID = 0;
  try {
    plateID = await prisma.numberplate.findUnique({
      where: {
        str: numberplateStr,
      },
      select: {
        id : true,
      },
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }

  try {
    const parking = await prisma.parking.findUnique({
      where: {
        id: parking_id,
      },
    });

    if (parking.nbr_free_spaces > 0) {
      await prisma.reservation.create({
        data: {
          numberplate_id: plateID.id,
          parking_id: parking_id,
          day: day,
          start_time: start_time,
          end_time: end_time,
        },
      });

      // Decrement the available_spots in the parking
      await prisma.parking.update({
        data: {
          nbr_free_spaces: {
            decrement: 1,
          },
        },
        where: {
          id: parking_id,
        },
      });
      prisma.$disconnect();
      res.status(201).json({ statusCode: 201 });
    } else {
      res.status(400).json({ error: 'No available spots in the parking' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

//afficher toutes les reservations
exports.getReservation = async function (request, response) {
  try {
    const result = await prisma.reservation.findMany();
    prisma.$disconnect();
    response.status(200).json(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
};



const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

//get tous les plaques
exports.getNumberPlate = async function getNumberPlate(req, res) {
  try {
    const allNumberPlate = await prisma.numberplate.findMany();
    console.log(allNumberPlate);
    res.json({ data: allNumberPlate });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
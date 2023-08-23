const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

//get tous les plaques
exports.getNumberPlate = async function getNumberPlate(req, res) {
  try {
    const allNumberPlate = await prisma.numberplate.findMany();
    console.log(allNumberPlate);
    prisma.$disconnect();
    res.json({ data: allNumberPlate });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Ajouter une nouvelle plaque d'immatriculation
exports.addNumberPlate = async function addNumberPlate(req, res) {
  try {
    const { str, person_id } = req.body; // Supposons que la plaque soit envoyée dans le corps de la requête
    console.log(str, person_id);
    if (!str) {
      return res
        .status(400)
        .json({ error: "Plaque d'immatriculation manquante dans la requête." });
    }

    const newNumberPlate = await prisma.numberplate.create({
      data: {
        str: str, // plate => input utilisateur
        person: {
          connect: {
            id: person_id, // userId => l'id du user qui doit être reçu dans la request
          },
        },
      },
    });
    //console.log(str, id);
    prisma.$disconnect();
    res.status(201).json({
      data: newNumberPlate,
      message: "Plaque d'immatriculation ajoutée avec succès.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error:
        "Une erreur est survenue lors de l'ajout de la plaque d'immatriculation.",
    });
  }
};

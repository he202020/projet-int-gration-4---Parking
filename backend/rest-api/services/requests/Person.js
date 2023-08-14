const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

//get tous les users
exports.getPerson = async function getPerson(req, res) {
  try {
    const allPerson = await prisma.person.findMany();
    console.log(allPerson);
    res.json({ data: allPerson });
  } catch (err) {
    console.log(err);
    res.statusCode(500);
  }
};

//verifier si le user existe ou pas
async function userExists(email) {
  const existingUser = await prisma.person.findUnique({
    where: {
      email: email,
    },
  });
  return existingUser !== null;
}


//ajouter un user

exports.postPerson = async function postPerson(req, res) {
  const { firstName, lastName, company, email, hash, plate } = req.body;
  try {
    /*const isExistingUser = await userExists(email);
    if (isExistingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }*/
    await prisma.person.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        company: company,
        email: email,
        hash: hash,
        numberplate: {
          create: {
            str: plate,
          },
        },
      },
    });
    res.json({ statusCode: 201 });
  } catch (err) {
    console.log(err);
    res.statusCode(500);
  }
};

const jwt = require('jsonwebtoken'); 

//verifie les infos de connexion
async function authenticateUser(email, hash) {
  const user = await prisma.person.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || user.hash !== hash) {
    return null; // Les informations de connexion sont incorrectes
  }

  return user;
}

//login

exports.login = async function login(req, res) {
  const { email, hash } = req.body;

  try {
    const user = await authenticateUser(email, hash);

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Générez un jeton d'authentification si la connexion réussit
    const token = jwt.sign({ userId: user.id }, 'your_secret_key_here', { expiresIn: '1h' }); // Génération du jeton

    const person = await prisma.person.findUnique({
      where: {
        email: email
      },
      select: {
        first_name: true
      }
    })

    res.status(200).json({ token: token, user: person });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


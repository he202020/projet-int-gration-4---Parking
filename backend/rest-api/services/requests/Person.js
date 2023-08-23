const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient();

//get tous les users
exports.getPerson = async function getPerson(req, res) {
  try {
    const allPerson = await prisma.person.findMany();
    console.log(allPerson);
    prisma.$disconnect();
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
    prisma.$disconnect();
    res.json({ statusCode: 201 });
  } catch (err) {
    console.log(err);
    res.statusCode(500);
  }
};

const jwt = require('jsonwebtoken');
const {verify} = require("jsonwebtoken");
const {verifyPassword} = require("./auth");

//verifie les infos de connexion
async function authenticateUser(email, hash) {
  const password = await prisma.person.findUnique({
    where: {
      email: email,
    },
    select: {
      hash: true
    }
  });
  prisma.$disconnect();
  return verifyPassword(hash, password.hash);
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
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Génération du jeton

    const person = await prisma.person.findUnique({
      where: {
        email: email
      },
      select: {
        first_name: true,
        id :true,
        numberplate: {
          select: {
            str: true,
          },
        }
      }});
    prisma.$disconnect();
    res.status(200).json({ token: token, user: person });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


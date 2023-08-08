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



//ajouter un user

exports.postPerson = async function postPerson(req, res) {
  const { first_name, last_name, company, email, hash } = req.body;
  try {
    await prisma.person.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        company: company,
        email: email,
        hash: hash,
      },
    });
    res.json({ statusCode: 200 });
  } catch (err) {
    console.log(err);
    res.statusCode(500);
  }
};

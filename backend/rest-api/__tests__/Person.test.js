// __tests__/Person.test.js
const { getPerson } = require("../../rest-api/services/requests/Person");
const { postPerson } = require("../../rest-api/services/requests/Person");
const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client");

describe("getPerson", () => {
  it("renvoie une liste de personnes", async () => {
    const mockFindMany = jest.fn(() => [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        company: "Ephec",
        email: "john@doe.be",
        hash: "$1$QRZ8KB.9$z81KqnuOMj2bMrh04zImZ/",
        is_admin: true,
      },
    ]);

    PrismaClient.prototype.person = {
      findMany: mockFindMany,
    };

    const mockReq = {};
    const mockRes = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getPerson({}, mockRes);

    expect(mockFindMany).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith({
      data: [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          company: "Ephec",
          email: "john@doe.be",
          hash: "$1$QRZ8KB.9$z81KqnuOMj2bMrh04zImZ/",
          is_admin: true,
        },
      ],
    });
  });

  /*it("gère les erreurs", async () => {
    const mockFindMany = jest.fn(() => {
      throw new Error("Database error");
    });

    PrismaClient.prototype.person = {
      findMany: mockFindMany,
    };

    const mockReq = {};
    const mockRes = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getPerson({}, mockRes); // Pass an empty request object

    expect(mockFindMany).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });*/
});


describe("postPerson", () => {
  it("ajoute un utilisateur avec succès", async () => {
    const mockCreate = jest.fn();

    PrismaClient.prototype.person = {
      create: mockCreate,
    };

    const mockReq = {
      body: {
        firstName: "John",
        lastName: "Doe",
        company: "Ephec",
        email: "pauline.vdh@gmail.com",
        hash: "coucou123",
        plate: "6-JJJ-666",
      },
    };

    const mockRes = {
      json: jest.fn(),
    };

    await postPerson(mockReq, mockRes);

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        first_name: "John",
        last_name: "Doe",
        company: "Ephec",
        email: "pauline.vdh@gmail.com",
        hash: "coucou123",
        numberplate: {
          create: {
            str: "6-JJJ-666",
          },
        },
      },
    });
    expect(mockRes.json).toHaveBeenCalledWith({ statusCode: 201 });
  });



});


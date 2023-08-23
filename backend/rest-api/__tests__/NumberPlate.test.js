// __tests__/NumberPlate.test.js
const {
  getNumberPlate,
} = require("../../rest-api/services/requests/NumberPlate");
const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client");

describe("getNumberPlate", () => {
  it("renvoie une liste de plaques d'immatriculation", async () => {
    const mockFindMany = jest.fn(() => [
      {
        id: 1,
        str: "ABC123",
      },
      {
        id: 2,
        str: "XYZ789",
      },
    ]);

    PrismaClient.prototype.numberplate = {
      findMany: mockFindMany,
    };

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getNumberPlate({}, mockRes);

    expect(mockFindMany).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith({
      data: [
        {
          id: 1,
          str: "ABC123",
        },
        {
          id: 2,
          str: "XYZ789",
        },
      ],
    });
  });

  
});

// __tests__/Reservation.test.js
const {
  getReservation,
} = require("../../rest-api/services/requests/Reservation");
const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client");

describe("getReservation", () => {
  /*it("affiche toutes les réservations avec succès", async () => {
    const mockFindMany = jest.fn(() => [
      {
        id: 1,
        numberplate_id: 1,
        parking_id: 1,
        day: "2023-08-23",
        start_time: "10:00",
        end_time: "12:00",
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

    await getReservation({}, mockRes);

    expect(mockFindMany).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith({
      data: [
        {
          id: 1,
          numberplate_id: 1,
          parking_id: 1,
          day: "2023-08-23",
          start_time: "10:00",
          end_time: "12:00",
        },
      ],
    });
  });

  it("gère les erreurs lors de la récupération des réservations", async () => {
    const mockFindMany = jest.fn(() => {
      throw new Error("Database error");
    });

    PrismaClient.prototype.reservation = {
      findMany: mockFindMany,
    };

    const mockReq = {};
    const mockRes = {
      json: jest.fn(),
      status: jest.fn(),
    };

    await getReservation(mockReq, mockRes);

    expect(mockFindMany).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith("Database error");
  });*/
});

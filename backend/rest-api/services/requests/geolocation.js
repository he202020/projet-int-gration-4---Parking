const sqlConnection = require("../index");
const geolib = require('geolib');

exports.getDistanceFromParking = async function (request, response) {
    try {
        const result = await sqlConnection`
            select parking_id from parking
        `;
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        for (let x of result) {
            x.latitude = getRandomInt(50);
            x.longitude = getRandomInt(50);
        }

        let distances_of_parking = []

        for (let parking of result) {
            let coords = {latitude: parking.latitude, longitude: parking.longitude};
            let distance = geolib.getDistance(request.body, coords);
            distances_of_parking.push({parking_id: parking.parking_id, distance: distance})
        }
        response.status(200).json(distances_of_parking);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
};

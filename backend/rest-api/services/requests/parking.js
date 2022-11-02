const sqlConnection = require("../index");

exports.getParking = async function (request, response) {
    try {
        const result = await sqlConnection`
            select * from parking
        `;
        response.status(200).json(result);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
};

exports.searchParking = async function (request, response) {
    try {
        const result = await sqlConnection`
            select * from parking
            where parking_name ilike ${'%' + request.params.query + '%'}
            or parking_adress ilike ${'%' + request.params.query + '%'}
        `;
        response.status(200).json(result);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
};
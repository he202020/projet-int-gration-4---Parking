const sqlConnection = require("../index");

exports.getUserData = async function (request, response) {
    try {
        const result = await sqlConnection`
            select id, firstname, lastname, email, company, numberplate from app_user
            where id=${request.user.id}
        `;
        response.status(200).json(result);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
}
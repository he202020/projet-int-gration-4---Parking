const sqlConnection = require("../index");

exports.getUserData = async function (request, response) {
    try {
        const result = await sqlConnection`
            select person_id, person_firstname, person_lastname, person_email from person
            where person_id=${request.user.person_id}
        `;
        response.status(200).json(result);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
}
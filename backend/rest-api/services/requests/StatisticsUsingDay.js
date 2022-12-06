const sqlConnection = require("../index");

exports.getNumberCar = async function (request, response) {
    try {
        const result = await sqlConnection`
    
    select count(person_id)
    from show_entry_exit as personne
    where cast( extract(dow from real_date_parking) as int) = ${request.body.selected}
    and  cast(parking_id as int) = ${request.body.selected }
        `;
        response.status(200).json(result);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
};



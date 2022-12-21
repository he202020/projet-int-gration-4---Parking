const sqlConnection = require("../index");

exports.getAvailablePlace = async function (request, response) {
    try {
        const result = await sqlConnection`
    
    select parking_name,parking_address,(parking_maximum_place - count(person_id) ) as place 
    from show_entry_exit
    inner join parking ON show_entry_exit.parking_id = parking.parking_id
    where end_time >=  '15:22:00'/* current_time */
    and real_date_parking  = '2022-09-22' /* current_date */
    group by parking_name,parking_address,parking_maximum_place
        `;
        response.status(200).json(result);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
};


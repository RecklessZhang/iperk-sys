const db = require('../db/config')

  export default function handler(request, response) {
    const { id } = request.query

    var sql = "update t_target set is_send_email = '1' where id = " + id;
    db.query(sql, (error, result) => {
        response.status(200).send(result)
    })

}
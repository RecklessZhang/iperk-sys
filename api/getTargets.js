const db = require('../db/config')

  export default function handler(request, response) {
    var sql = 'select * from t_target'
    db.query(sql, (error, result) => {
        response.status(200).send(result)
    })

}
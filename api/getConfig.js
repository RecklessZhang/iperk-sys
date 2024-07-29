const db = require('../db/config')

  export default function handler(request, response) {
    var sql = "select DATE_FORMAT(start_date, '%Y-%m-%d') as start_date, average_remain, interval_hour from t_config"
    db.query(sql, (error, result) => {
        response.status(200).send(result)
    })

}
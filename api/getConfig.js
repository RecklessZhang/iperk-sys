const db = require('../db/config')

  export default function handler(request, response) {
    var sql = 'select * from t_user'
    db.query(sql, (error, result) => {
        console.log('fuck result=====>')
        console.log(result)
        response.status(200).send(result)
    })

}
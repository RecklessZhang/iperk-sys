const db = require('../db/config')

  export default function handler(request, response) {
    const { name, price, count } = request.query

    var sql = "SET @max_sort = (SELECT MAX(sort) FROM t_target); insert into t_target(name, price, count, sort) values ('"+name+"', "+price+", "+count+", @max_sort + 1)"
    db.query(sql, (error, result) => {
        response.status(200).send(result)
    })

}
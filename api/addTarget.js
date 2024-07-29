const db = require('../db/config')

  export default function handler(request, response) {
    const { name, price, count } = request.query

    var sql = "SET @max_sort = (SELECT MAX(sort) FROM t_target)"
    db.query(sql, (error, result) => {
        sql = "insert into t_target(name, price, count, sort) values ( ?, ?, ?, @max_sort + 1)"

        db.query(sql, [name, price * 1, count * 1], (error, result) => {
            if (error) {
                console.error(error); // 输出错误信息到控制台
                response.status(500).send(error);
            } else {
                response.status(200).send(result);
            }
        })
    })

}
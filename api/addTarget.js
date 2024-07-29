const db = require('../db/config')

  export default function handler(request, response) {
    const { name, price, count } = request.query

    var sql = "SET @max_sort = (SELECT MAX(sort) FROM t_target); insert into t_target(name, price, count, sort) values ( ?, ?, ?, @max_sort + 1)"
    db.query(sql, [name, price, count], (error, result) => {
        if (error) {
            console.error(error); // 输出错误信息到控制台
            response.status(500).send('Internal Server Error');
        } else {
            response.status(200).send(result);
        }
    })

}
const db = require('../db/config')

  export default function handler(request, response) {
    const { name, price, count } = request.query

    var sql = "INSERT INTO t_target (name, price, count, sort) SELECT ?, ?, ?, COALESCE(max_sort.max_sort, 0) + 1 FROM (SELECT MAX(sort) AS max_sort FROM t_target) AS max_sort"
    db.query(sql, [name, price * 1, count * 1], (error, result) => {
        if (error) {
            console.error(error); // 输出错误信息到控制台
            response.status(500).send(error);
        } else {
            response.status(200).send(result);
        }
    })

}
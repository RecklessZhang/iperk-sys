export default function handler(request, response) {
    var sql = "SET @max_sort = (SELECT MAX(sort) FROM t_target);INSERT INTO t_target (name, count, price, sort) VALUES ('fuck', 1, 100, @max_sort + 1);"
    
    db.query(sql, (error, result) => {
        response.status(200).send(request)
    })
}
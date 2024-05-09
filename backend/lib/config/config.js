const mysql = require("mysql2");

const ExdbConfig = {
    host: "localhost",
    user: "root",
    password: "1209",
    database: "ShopDB",
    dialect: "mysql",
    timezone: "+09:00",
}

const ExdbConnection = mysql.createPool(ExdbConfig);

ExdbConnection.getConnection((err, connection) => {
    if (err) {
        console.error("데이터베이스 연결 실패:", err);
    } else {
        console.log("데이터베이스에 성공적으로 연결되었습니다.");
    }
    connection.release();
});

module.exports = { ExdbConfig };
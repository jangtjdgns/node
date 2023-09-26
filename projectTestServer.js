const express = require("express");
const mysql = require("mysql");                             // db mysql
const dbconfig = require("./config/database.js");           // db 구성
const connection = mysql.createConnection(dbconfig);        // db 연결
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");                              // ejs 설정

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./views/CSS"));                     // css 경로

// 포트
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// 메인
app.get("/", function (req, res) {
    connection.query('SELECT * from Users', (error, rows) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        console.log(rows[0].id, rows[0].password);
        res.render("index", { user: rows });
    });

    // res.render("index");
});

/* 토론방 */
// 전체 토론방
app.get("/allDR", function (req, res) {
    res.render("discussion-room");
});
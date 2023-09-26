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
    res.render("index");
});

/* 토론방 */
// 전체 토론방
app.post("/DR", function (req, res) {

    const val = req.body.dr;

    console.log(val);

    if (val === 'all') {
        connection.query('SELECT * from discussion_rooms', (error, discussionRooms) => {
            drConnect("all", error, discussionRooms, res);
        });
    } else if (val === 'rec') {
        connection.query('SELECT * from discussion_rooms WHERE `field` = "요리"', (error, discussionRooms) => {
            drConnect("rec", error, discussionRooms, res);
        });
    } else if (val === 'my') {
        connection.query('SELECT * from discussion_rooms WHERE id > 5', (error, discussionRooms) => {
            drConnect("my", error, discussionRooms, res);
        });
    }
});

// 토론방 연결 함수
function drConnect(val, error, discussionRooms, res) {
    var rooms = [];
    if (error) throw error;

    for (var room of discussionRooms) {
        rooms.push(room);
    }

    res.render("discussion-room", { val, rooms: rooms });
}
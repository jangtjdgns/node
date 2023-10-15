// 서버 열기
// var http = require("http");

// http.createServer(function(req, res){   // request(요청), response(응답)
//     res.end("hello world!");
// }).listen(3000);                        // port: 3000

// console.log("Server running at http:192.168.4.14:3000");


// npm express
const express = require('express');
const app = express();

app.set("view engine", "ejs");      // EJS 설정

// 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const todo = require("./routes/todo");
const column = require("./routes/column");

app.use("/todo", todo);
app.use("/column", column);

app.use(express.static("public"));

/* ================================= */

// 메인
app.get('/', function (req, res) {

    res.render("index", { name: "장성훈" });
});

/* ================================= */

// 포트
app.listen(3000, () => {

    console.log("Server is running on port 3000");
});

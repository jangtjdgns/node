// 서버 열기
// var http = require("http");

// http.createServer(function(req, res){   // request(요청), response(응답)
//     res.end("hello world!");
// }).listen(3000);                        // port: 3000

// console.log("Server running at http:192.168.4.14:3000");


// npm express
const express = require('express');
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");      // EJS 설정

// 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


// 읽기
function readData() {

    const rawData = fs.readFileSync("data.json");

    return JSON.parse(rawData);
}

//쓰기
function writeData(data) {

    fs.writeFileSync("data.json", JSON.stringify(data));    // json파일을 문자열로 변환 -> stringify
}


/* ================================= */

// 메인
app.get('/', function (req, res) {

    // const data = readData();

    // res.send(data);

    res.render("index", { name: "장성훈" });
});

// 할 일 목록
app.get("/todoList", function (req, res) {

    const data = readData();

    res.render("todoList", { items: data });
});

// 작성 페이지 이동
app.get("/write", function (req, res) {

    res.render("write");
});

// 상세 페이지 이동
// pathVariable로 값을 가져올 때, /:id 로사용, req.params.id 받아온 데이터
app.get("/detail/:id", function (req, res) {

    const data = readData();

    const detailData = data.find((p) => p.id === parseInt(req.params.id));       // 더 좋은 방법, 배열을 순회하는 find 메서드
    
    // var detailData;

    // for (var val of data) {
    //     if (val.id == req.params.id) {
    //         detailData = val;
    //         break;
    //     }
    // }

    res.render("detail", { item: detailData });
});


// 추가
app.post("/write", function (req, res) {

    const data = readData();

    const today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    const formatToday = `${year}-${month}-${day}`;

    // const newItemObject = { id: Date.now(), title: req.body.title, contents: req.body.contents, curDate: formatToday, rank: req.body.rank, subscribe: false };
    const newItemObject = {};
    newItemObject.id = Date.now();
    newItemObject.title = req.body.title;
    newItemObject.contents = req.body.contents;
    newItemObject.curDate = formatToday;
    newItemObject.rank = req.body.rank;
    newItemObject.subscribe = false;

    data.push(newItemObject);

    writeData(data);

    res.redirect("/todoList");
});


// 수정
app.post("/edit", function (req, res) {

    const data = readData();

    for (var val of data) {
        if (val.id == req.body.id) {
            val.title = req.body.editedItem;
            writeData(data);
            break;
        }
    }

    res.redirect("/todoList");
});

// 삭제
app.post("/delete", function (req, res) {

    const data = readData();

    for (var [idx, val] of data.entries()) {
        if (val.id == req.body.id) {
            data.splice(idx, 1);
            writeData(data);
            break;
        }
    }

    res.redirect("/todoList");
});

// 구독
app.post("/subscribe", function (req, res) {

    const data = readData();

    for (var [idx, val] of data.entries()) {
        if (val.id == req.body.id) {
            val.subscribe == true ? val.subscribe = false : val.subscribe = true;
            break;
        }
    }

    writeData(data);

    res.redirect("/todoList");
});

/* ================================= */

// 포트
app.listen(3000, () => {

    console.log("Server is running on port 3000");
});

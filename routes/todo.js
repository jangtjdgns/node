const express = require("express");
const dataHandler = require("../dataHandler");
const commonFunc = require("../common");
const router = express.Router();

// 할 일 목록
router.get("/list", function (req, res) {

    const data = dataHandler.readData();

    res.render("todo/todoList", { items: data });
});

// 작성 페이지 이동
router.get("/write", function (req, res) {

    res.render("todo/write");
});

// 상세 페이지 이동
// pathVariable로 값을 가져올 때, /:id 로사용, req.params.id 받아온 데이터
router.get("/detail/:id", function (req, res) {

    const data = dataHandler.readData();

    const detailData = data.find((p) => p.id === parseInt(req.params.id));       // 더 좋은 방법, 배열을 순회하는 find 메서드

    // var detailData;

    // for (var val of data) {
    //     if (val.id == req.params.id) {
    //         detailData = val;
    //         break;
    //     }
    // }

    res.render("todo/detail", { item: detailData });
});


// 추가
router.post("/write", function (req, res) {

    const data = dataHandler.readData();

    const newItemObject = {};
    newItemObject.id = Date.now();
    newItemObject.title = req.body.title;
    newItemObject.contents = req.body.contents;
    newItemObject.curDate = commonFunc.getRegistDt();
    newItemObject.rank = req.body.rank;
    newItemObject.subscribe = false;

    data.push(newItemObject);

    dataHandler.writeData(data);

    res.redirect("/todo/list");
});


// 수정
router.post("/edit", function (req, res) {

    const data = dataHandler.readData();

    for (var val of data) {
        if (val.id == req.body.id) {
            val.title = req.body.editedItem;
            dataHandler.writeData(data);
            break;
        }
    }

    res.redirect("/todo/list");
});

// 삭제
router.post("/delete", function (req, res) {

    const data = dataHandler.readData();

    for (var [idx, val] of data.entries()) {
        if (val.id == req.body.id) {
            data.splice(idx, 1);
            dataHandler.writeData(data);
            break;
        }
    }

    res.redirect("/todo/list");
});

// 구독
router.post("/subscribe", function (req, res) {

    const data = dataHandler.readData();

    for (var [idx, val] of data.entries()) {
        if (val.id == req.body.id) {
            val.subscribe == true ? val.subscribe = false : val.subscribe = true;
            break;
        }
    }

    dataHandler.writeData(data);

    res.redirect("/todo/list");
});

module.exports = router;
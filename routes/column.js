const express = require("express");
const dataHandler = require("../columnDataHandler");
const commonFunc = require("../common");
const router = express.Router();

router.get("/list", function (req, res) {
    const columnData = dataHandler.readData("columnData.json");

    res.render("column/columnList", { items: columnData });
});

router.get("/write", function (req, res) {

    res.render("column/write");
});

router.post("/write", function (req, res) {

    const data = dataHandler.readData();
    
    const newItemObject = {};
    newItemObject.id = Date.now();
    newItemObject.title = req.body.title;
    newItemObject.author = req.body.author;
    newItemObject.curDate = commonFunc.getRegistDt();

    data.push(newItemObject);

    dataHandler.writeData(data);

    res.redirect("/column/list");
});

router.get("/detail/:id", function (req, res) {

    const data = dataHandler.readData();

    const detailData = data.find((p) => p.id === parseInt(req.params.id));       // 더 좋은 방법, 배열을 순회하는 find 메서드

    res.render("column/detail", { item: detailData });
});

module.exports = router;
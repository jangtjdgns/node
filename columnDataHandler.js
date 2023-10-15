const fs = require("fs");

// 읽기
function readData() {

    const rawData = fs.readFileSync("columnData.json");

    return JSON.parse(rawData);
}

//쓰기
function writeData(data) {

    fs.writeFileSync("columnData.json", JSON.stringify(data));    // json파일을 문자열로 변환 -> stringify
}

module.exports = {
    readData,
    writeData,
}
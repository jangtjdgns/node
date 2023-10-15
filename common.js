function getRegistDt() {
    const today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`
}


module.exports = {
    getRegistDt
}
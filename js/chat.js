let user = [];
let room = "";

window.onload = function () {
    var url = document.location.href;
    data = url.split('%')
    console.log(data);
    name1 = data[1];
    room = data[2];
    user.push(name1);
}
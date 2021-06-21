let join = document.getElementById('btn');
let username = document.getElementById('username');
let roomNumber = document.getElementById('roomNumber');

console.log(join);
join.addEventListener('click', (e) => {
    e.preventDefault();
    var data = username.value + "%" + roomNumber.value;
    url = `http://127.0.0.1:5500/static/chat.html?data=%` + data;
    window.location.href = url;
});
// Idea for now is to use user from USERS in server site
//  and get display message body and message input from here

console.log('Joined to client');
const socket = io();
let displayMessage = document.querySelector('.displayMessage');
let messageInp = document.getElementById('messageInp');
let sendMsg = document.getElementById('sendMsg');
let Room = document.getElementsByClassName('room')[0];
let UName = document.getElementsByClassName('uname')[0];
let loc1 = document.getElementById('location1');
let loc2 = document.getElementById('location2');


var audio = new Audio('ting.mp3');

window.onload = function () {
    var url = document.location.href;
    console.log(url);
    data = url.split('?')
    console.log(data);
    params = data[1].split('&');
    username = params[0].split('=')[1];
    room = params[1].split('=')[1];
    console.log(username, room);
    console.log(Room);
    console.log(UName);
    Room.innerHTML = `# ${room}`;
    UName.innerHTML = username
}


const appendAnnounce = (message, position) => {
    // message announcement
    // Its only for Announcement
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    displayMessage.append(messageElement);
}
const appendURL = (userName, locationLink, position) => {
    // message announcement
    // Its only for Announcement

    const date = new Date();
    const Hour = date.getHours();
    const Min = date.getMinutes();
    console.log(Hour, Min);


    console.log('Add message');
    let elementMessage = document.createElement('div');
    elementMessage.classList.add('message');
    elementMessage.classList.add(position);

    let elementDetails = document.createElement('div');
    elementDetails.classList.add('details');

    let elementUsername = document.createElement('div');
    elementUsername.classList.add('username');
    elementUsername.innerHTML = userName;
    elementDetails.appendChild(elementUsername);

    let elementTime = document.createElement('div');
    elementTime.classList.add('time');
    elementTime.innerHTML = `${Hour}:${Min}`;
    elementDetails.appendChild(elementTime);

    elementMessage.appendChild(elementDetails);

    let elementHr = document.createElement('hr');
    elementMessage.appendChild(elementHr);
    // #####################################################
    const messageLoc = document.createElement('div');
    messageLoc.classList.add('message');
    messageLoc.classList.add(position);
    const locLink = document.createElement('a');
    locLink.setAttribute('href', locationLink);
    locLink.setAttribute('target', '_blank');
    locLink.innerText = 'click here';
    messageLoc.appendChild(locLink);
    // ######################################

    elementMessage.appendChild(messageLoc);

    displayMessage.appendChild(elementMessage);

    if (position == 'msg-left') {
        audio.play();
    }

    displayMessage.scrollTop = displayMessage.scrollHeight - displayMessage.clientHeight;




}


const appendMessage = (userName, message, position) => {
    // message    msg-right msg-left announcement
    const date = new Date();
    const Hour = date.getHours();
    const Min = date.getMinutes();
    console.log(Hour, Min);


    console.log('Add message');
    let elementMessage = document.createElement('div');
    elementMessage.classList.add('message');
    elementMessage.classList.add(position);

    let elementDetails = document.createElement('div');
    elementDetails.classList.add('details');

    let elementUsername = document.createElement('div');
    elementUsername.classList.add('username');
    elementUsername.innerHTML = userName;
    elementDetails.appendChild(elementUsername);

    let elementTime = document.createElement('div');
    elementTime.classList.add('time');
    elementTime.innerHTML = `${Hour}:${Min}`;
    elementDetails.appendChild(elementTime);

    elementMessage.appendChild(elementDetails);

    let elementHr = document.createElement('hr');
    elementMessage.appendChild(elementHr);

    let elementMsgText = document.createElement('div');
    elementMsgText.classList.add('text');
    elementMsgText.setAttribute("id", "msg-text");
    elementMsgText.innerHTML = message;
    elementMessage.appendChild(elementMsgText);

    displayMessage.appendChild(elementMessage);

    if (position == 'msg-left') {
        audio.play();
    }

    displayMessage.scrollTop = displayMessage.scrollHeight - displayMessage.clientHeight;
}

sendMsg.addEventListener('click', () => {
    console.log("Clicked on send");
    const message = messageInp.value;
    console.log(message);
    appendMessage(`You`, `${message}`, 'msg-right');
    socket.emit('send', message);
    messageInp.value = '';
})



loc1.addEventListener('click', () => {
    let longitude;
    let latitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude);
            console.log(latitude);
            url = `http://www.google.com/maps/place/${latitude},${longitude}`
            console.log(url);
            appendURL('You', url, 'msg-right');
            socket.emit('sendURL', url);
        })
    } else {
        console.log('Error : Not available')
    }


});
loc2.addEventListener('click', () => {
    let longitude;
    let latitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude);
            console.log(latitude);
            url = `http://www.google.com/maps/place/${latitude},${longitude}`
            console.log(url);
            appendURL('You', url, 'msg-right');
            socket.emit('sendURL', url);
        })
    } else {
        console.log('Error : Not available')
    }


});


socket.emit('new-user-joined');

socket.on('user-joined', name1 => {
    appendAnnounce(`${name1} joined the chat`, 'announcement');
})

socket.on('receive', data => {
    appendMessage(`${data.name}`, `${data.message}`, 'msg-left');
})
socket.on('receiveURL', data => {
    appendURL(data.name, data.urlLink, 'msg-left');
})

socket.on('left', name => {
    appendAnnounce(`${name} left the chat`, 'announcement');
})
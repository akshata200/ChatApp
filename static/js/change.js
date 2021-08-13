// To change theme of chat window
let changeTheme = document.getElementById('cTheme');
changeTheme.addEventListener('click', () => {
    console.log('Clicked');
    let themeLink = document.getElementsByTagName('link')[0];
    console.log(themeLink);
    console.log(themeLink.href);
    console.log(changeTheme.innerText);
    if (themeLink.href == 'https://chatappmaster.herokuapp.com/css/green.css') {
        themeLink.href = 'https://chatappmaster.herokuapp.com/css/purple.css';
        changeTheme.innerText = 'Green Theme';
    } else if (themeLink.href == 'https://chatappmaster.herokuapp.com/css/purple.css') {
        themeLink.href = 'https://chatappmaster.herokuapp.com/css/green.css';
        changeTheme.innerText = 'Purple Theme';
    }
});

//  To hide/ show menu
let burger = document.getElementById('burger');
let left = document.querySelector('.left');
let right = document.querySelector('.right');

burger.addEventListener('click', () => {
    left.classList.toggle('visible');
    right.classList.toggle('notVisible');
});
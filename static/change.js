console.log('Change.js');


let changeTheme = document.getElementById('cTheme');
changeTheme.addEventListener('click', () => {
    console.log('Clicked');
    let themeLink = document.getElementsByTagName('link')[0];
    console.log(themeLink);
    console.log(themeLink.href);
    console.log(changeTheme.innerText);
    if (themeLink.href == 'https://chatappmaster.herokuapp.com/green.css') {
        themeLink.href = 'https://chatappmaster.herokuapp.com/purple.css';
        changeTheme.innerText = 'Green Theme';
    } else if (themeLink.href == 'https://chatappmaster.herokuapp.com/purple.css') {
        themeLink.href = 'https://chatappmaster.herokuapp.com/green.css';
        changeTheme.innerText = 'Purple Theme';
    }
});



let burger = document.getElementById('burger');
let left = document.querySelector('.left');
let right = document.querySelector('.right');
console.log(burger);
console.log(left);
console.log(right);

burger.addEventListener('click', () => {
    left.classList.toggle('visible');
    right.classList.toggle('notVisible');
});
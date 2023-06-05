let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let img = document.querySelector('.home-img');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    img.classList.remove('home-img');
}
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}
// burger menu code pets

const burger = document.querySelector('.burger');
const nav = document.querySelector('.burger-menu');
const overlay = document.querySelector('.overlay');
const html = document.documentElement;
const logo = document.querySelector('.header-logo');
const header = document.querySelector('.header');

const toggleBurger = () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    html.classList.toggle('hidden');
    logo.classList.toggle('in-burger');
    header.classList.toggle('hidden')
}

const closeBurger = (event) => {
    if (!event.target.classList.contains('list-item-link') ||
    event.target.classList.contains('list-item-link')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        html.classList.remove('hidden');
        logo.classList.remove('in-burger');
        header.classList.remove('hidden');
    }
}

burger.addEventListener('click',toggleBurger);
nav.addEventListener('click', closeBurger);
overlay.addEventListener('click', closeBurger);
// header.addEventListener('click', closeBurger);

window.addEventListener("resize", function() {
    if (this.document.documentElement.clientWidth >= 768) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        html.classList.remove('hidden');
        logo.classList.remove('in-burger');
    }
  })
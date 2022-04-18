// burger menu code pets

const burger = document.querySelector('.burger');
const nav = document.querySelector('.burger-menu');

const toggleBurger = () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
}

const closeBurger = (event) => {
    if (event.target.classList.contains('list-item-link')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
    }
}

burger.addEventListener('click',toggleBurger);
nav.addEventListener('click', closeBurger);
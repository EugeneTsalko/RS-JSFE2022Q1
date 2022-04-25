// alert(`Привет, уважаемый проверяющий. Буду очень благродарен, если ты проверишь мою работу в четверг. Если ты не можешь - напиши, пожалуйста, мне в дискорд. Спасибо!`)
// burger menu code

const burger = document.querySelector('.burger');
const nav = document.querySelector('.burger-menu');
const overlay = document.querySelector('.overlay');
const html = document.documentElement;
const logo = document.querySelector('.header-logo');

const toggleBurger = () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    html.classList.toggle('hidden');
    logo.classList.toggle('in-burger');
}

const closeBurger = (event) => {
    if (!event.target.classList.contains('list-item-link') ||
    event.target.classList.contains('list-item-link')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        html.classList.remove('hidden');
        logo.classList.remove('in-burger');
    }
}

burger.addEventListener('click',toggleBurger);
nav.addEventListener('click', closeBurger);
overlay.addEventListener('click', closeBurger);

window.addEventListener("resize", function() {
    if (this.document.documentElement.clientWidth >= 768) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        html.classList.remove('hidden');
        logo.classList.remove('in-burger');
    }
  })

//   slider code

let petNameArr = ['katrine', 'jennifer', 'woody', 'sophia', 'freddie', 'scarlett', 'charly', 'timmy'];

const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let petCard1 = document.querySelector('#petCard1');
let petCard2 = document.querySelector('#petCard2');
let petCard3 = document.querySelector('#petCard3');
let sliderItems = document.querySelector('.slider-items');

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function buildPetCard(i) {
    let petName = petNameArr[i];

    const buildedPetCard = `
    
        <img src="../../assets/images/png/pets-${petName}.png" alt="${petName}" class="pet-image">
        <p class="pet-name">${petName[0].toUpperCase() + petName.slice(1)}</p>
        <button class="btn-pets">Learn more</button>
    
    `;
    // console.log(`pet card ${i} bulided`);
    return buildedPetCard;
}

function buildSliderItems() {
    
    let item1 = buildPetCard(randomInteger(0, 7));

    let item2 = buildPetCard(randomInteger(0, 7));
    while (item1 === item2) {
        item2 = buildPetCard(randomInteger(0, 7));
    }

    let item3 = buildPetCard(randomInteger(0, 7));
    while(item2 === item3 || item1 === item3) {
        item3 = buildPetCard(randomInteger(0, 7));
    }

    let buildedSliderItems = `
    <div class="pet-card" id="petCard1">${item1}</div>
    <div class="pet-card" id="petCard2">${item2}</div>
    <div class="pet-card" id="petCard3">${item3}</div>
    `;
    return buildedSliderItems;
}

function sliderAnimationIn() {
    sliderItems.classList.add('animation-in');
    setTimeout(() => sliderItems.classList.remove('animation-in'), 500);
}

function sliderAnimationOut() {
    sliderItems.classList.add('animation-out');
    setTimeout(() => sliderItems.classList.remove('animation-out'), 500);
}

prevBtn.addEventListener('click', () => sliderItems.innerHTML = buildSliderItems());
nextBtn.addEventListener('click', () => sliderItems.innerHTML = buildSliderItems());
prevBtn.addEventListener('click', sliderAnimationOut);
nextBtn.addEventListener('click', sliderAnimationIn);

// 
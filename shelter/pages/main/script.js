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

let petNameArr = ['jennifer', 'sophia', 'woody', 'scarlett', 'katrine', 'timmy', 'freddie', 'charly'];

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
    <div class="pet-card" id="petCard1" data-pet="${petName}">
        <img src="../../assets/images/png/pets-${petName}.png" alt="${petName}" class="pet-image" data-pet="${petName}">
        <p class="pet-name" data-pet="${petName}">${petName[0].toUpperCase() + petName.slice(1)}</p>
        <button class="btn-pets" data-pet="${petName}">Learn more</button>
    </div>
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
    ${item1}
    ${item2}
    ${item3}
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

// popup code

const popup = document.querySelector('.popup')
const popupWrapper = document.querySelector('.popup-wrapper')
const popupCloseBtn = document.querySelector('.popup-close')
const petCardsArr = sliderItems.children;

const openPopup = () => {
    popup.classList.toggle('active')
    overlay.classList.toggle('active')
    html.classList.toggle('hidden')
}


function showBuildedPopup(event) {
    // console.log(event.target)

    if(event.target.hasAttribute('data-pet')) {
        console.log(event.target.getAttribute('data-pet'))
        let petName = event.target.getAttribute('data-pet')
        let petFromObj

        for(let i = 0; i < data.length; i++) {

            if (petName === data[i].name) {
                petFromObj = data[i]
                console.log(petFromObj)
            }
        }
        popupWrapper.innerHTML = buildPopup(petFromObj)
    }
    openPopup()
}

function buildPopup(obj) {
    let buildedPopup = `
                
                    <img src="${obj.img}" alt="${obj.name}" class="popup-img">
                    <div class="popup-content">
                        <h3 class="popup-name">${obj.name[0].toUpperCase() + obj.name.slice(1)}</h3>
                        <h4 class="popup-type">${obj.type} - ${obj.breed}</h4>
                        <p class="popup-description">${obj.description}</p>
                        <ul class="popup-info">
                            <li class="popup-age">Age:
                                <span class="popup-info-value">${obj.age}</span>
                            </li>
                            <li class="popup-inoculations">Inoculations:
                                <span class="popup-info-value">${obj.inoculations}</span>
                            </li>
                            <li class="popup-diseases">Diseases:
                                <span class="popup-info-value">${obj.diseases}</span>
                            </li>
                            <li class="popup-parasites">Parasites:
                                <span class="popup-info-value">${obj.parasites}</span>
                            </li>
                        </ul>
                    </div>
            
    `
    return buildedPopup
}

const closePopup = (event) => {
    console.log(event.target)
    if(event.target.classList.contains('popup-close') || event.target.classList.contains('popup-close-img') ||
    event.target.classList.contains('overlay')) {
        console.log(event.target)
        popup.classList.remove('active')
        overlay.classList.remove('active')
        html.classList.remove('hidden')
    }
}

function closeBtn(event) {
    if(event.target.classList.contains('popup-close')) {
        console.log('da')
    }
    
}



// window.addEventListener('click', () => console.log(event.target))
sliderItems.addEventListener('click', showBuildedPopup);
popupCloseBtn.addEventListener('click', closePopup);
// popupCloseBtn.addEventListener('click', closeBtn);
overlay.addEventListener('click', closePopup);
popup.addEventListener('mouseleave', () => console.log('mouseenter'))
// popupCloseBtn.addEventListener('click', closePopup);
// petCard2.addEventListener('click', () => console.log('click'));
// petCard3.addEventListener('click', () => console.log('click'));



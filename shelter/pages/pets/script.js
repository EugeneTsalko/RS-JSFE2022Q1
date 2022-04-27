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
    header.classList.toggle('hidden');
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
    if (this.window.innerWidth >= 768) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        html.classList.remove('hidden');
        logo.classList.remove('in-burger');
    }
  })


// popup code

const popup = document.querySelector('.popup');
const popupWrapper = document.querySelector('.popup-wrapper');
const popupCloseBtn = document.querySelector('.popup-close');
// const petCardsArr = sliderItems.children;
const sliderItems = document.querySelector('.pets-gallery');

const openPopup = () => {
    popup.classList.toggle('active');
    overlay.classList.toggle('active');
    overlay.classList.toggle('zIndex');
    html.classList.toggle('hidden');
    // header.classList.toggle('notFixed');
}


const showBuildedPopup = function (event) {
    // console.log(event.target);

    if(event.target.hasAttribute('data-pet')) {
        // console.log(event.target.getAttribute('data-pet'));
        let petName = event.target.getAttribute('data-pet');
        let petFromObj;

        for(let i = 0; i < data.length; i++) {

            if (petName === data[i].name) {
                petFromObj = data[i];
                console.log(petFromObj);
            }
        }
        popupWrapper.innerHTML = buildPopup(petFromObj);
    }
    openPopup();
}

const buildPopup = function (obj) {
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
    `;
    return buildedPopup;
}

const closePopup = (event) => {
    // console.log(event.target);
    if(event.target.classList.contains('popup-close') || event.target.classList.contains('popup-close-img') ||
    event.target.classList.contains('overlay')) {
        // console.log(event.target);
        popup.classList.remove('active');
        overlay.classList.remove('active');
        overlay.classList.remove('zIndex');
        html.classList.remove('hidden');
    }
}

const popupCloseBtnHover = () => {
    popupCloseBtn.classList.add('hover');
}

const popupCloseBtnHoverRemove = () => {
    popupCloseBtn.classList.remove('hover');
}

// window.addEventListener('click', () => console.log(event.target))
sliderItems.addEventListener('click', showBuildedPopup);
popupCloseBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);
overlay.addEventListener('mouseover', popupCloseBtnHover);
overlay.addEventListener('mouseout', popupCloseBtnHoverRemove);

// pagination code

const buttonsArr = document.getElementsByClassName("slider-button");
const beginButton = buttonsArr[0]; 
const prevButton = buttonsArr[1]; 
const currentPage = document.querySelector('.slider-current');
const nextButton = buttonsArr[2];
const endButton = buttonsArr[3];
const petsGallery = document.querySelector('.pets-gallery');

let pageCounter = 1;

let cardsOnPageNumber;
// function getCardsOnPageNum() {
if (window.innerWidth >= 1280) {
        cardsOnPageNumber = 8;
    } else if (window.innerWidth >= 768) {
        cardsOnPageNumber = 6;
    } else {
        cardsOnPageNumber = 3;
    }
// }

const getShuffledNumbers = () => {
    let numbers = [];
    for (let i = 0; i < data.length; i++) {
      numbers.push(i);
    }
    let shuffledNumbers = [];
    for (let i = 0; i < cardsOnPageNumber; i++) {
        let randomPosition = Math.floor(Math.random() * numbers.length);
        shuffledNumbers.push(numbers.splice(randomPosition, 1)); // костя 
    }
    // console.log(`shuffledNumbers: ${shuffledNumbers}`);
    return shuffledNumbers.flat();
};

let uniqueCardsNumsArr = [];
// let queueArr;

for (let i = 0; i < 48 / cardsOnPageNumber; i++) {
    uniqueCardsNumsArr.push(getShuffledNumbers());
}

let queueArr = uniqueCardsNumsArr.flat(); // массив из 48 номеров уникального порядка

let lastPage = queueArr.length / cardsOnPageNumber; // 6 8 16

function buildPage() {
    let currentPageValue = pageCounter;
    // console.log(`currentPageValue: ${currentPageValue}`);
    
    let lastPageCardIndex = (queueArr.length / lastPage) * currentPageValue;
    // console.log(`lastPageCardIndex: ${lastPageCardIndex}`);
    
    let firstPageCardIndex = lastPageCardIndex - cardsOnPageNumber;
    // console.log(`firstPageCardIndex: ${firstPageCardIndex}`);
    
    for (let i = firstPageCardIndex; i < lastPageCardIndex  && i >= firstPageCardIndex; i++) {
        let buildPetCard = (function () {
        const buildedPetCard = document.createElement("div");
        let petName = data[queueArr[i]].name;
        buildedPetCard.classList.add("pet-card");
        buildedPetCard.innerHTML = `
            <div class="pet-card" id="petCard1" data-pet="${petName}">
                <img src="../../assets/images/png/pets-${petName}.png" alt="${petName}" class="pet-image" data-pet="${petName}">
                <p class="pet-name" data-pet="${petName}">${petName[0].toUpperCase() + petName.slice(1)}</p>
                <button class="btn-pets" data-pet="${petName}">Learn more</button>
            </div>
            `;
        // petsGallery.innerHTML = newCard;
        petsGallery.insertAdjacentElement('afterbegin', buildedPetCard);
       })(); // IIFE (Immediately Invoked Function Expression)
    }
    currentPage.innerHTML = currentPageValue;
}

function clearGallery() {
    petsGallery.innerHTML = '';
}

clearGallery();
buildPage();

const toggleDisableClass = () => {
    if (pageCounter === 1) {
        beginButton.classList.add('disabled');
        prevButton.classList.add('disabled');
    } else {
        beginButton.classList.remove('disabled');
        prevButton.classList.remove('disabled');
    }

    if(pageCounter === queueArr.length / cardsOnPageNumber) {
        nextButton.classList.add('disabled');
        endButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
        endButton.classList.remove('disabled');
    }
}

// window.addEventListener('click', () => console.log(event.target));

beginButton.addEventListener("click", () => {
    // console.log('beginButton');
    pageCounter = 1;
    clearGallery();
    buildPage();
    toggleDisableClass();
});

prevButton.addEventListener("click", () => {
    // console.log('prevButton');
    if (pageCounter !== 1) {
        pageCounter -= 1;
        clearGallery();
        buildPage();
        toggleDisableClass(); 
    }
});

nextButton.addEventListener("click", () => {
    // console.log('nextButton');
    if (pageCounter !== lastPage) {
    pageCounter += 1;
    clearGallery();
    buildPage();
    toggleDisableClass();
    }
});

endButton.addEventListener("click", () => {
    // console.log('endButton');
    pageCounter = queueArr.length / cardsOnPageNumber;
    clearGallery();
    buildPage();
    toggleDisableClass();
});


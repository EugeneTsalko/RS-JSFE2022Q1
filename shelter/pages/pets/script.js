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


// popup code

const popup = document.querySelector('.popup')
const popupWrapper = document.querySelector('.popup-wrapper')
const popupCloseBtn = document.querySelector('.popup-close')
// const petCardsArr = sliderItems.children;
const sliderItems = document.querySelector('.pets-wrapper');
const openPopup = () => {
    popup.classList.toggle('active')
    overlay.classList.toggle('active')
    html.classList.toggle('hidden')
}


function showBuildedPopup(event) {
    // console.log(event.target)

    if(event.target.hasAttribute('data-pet')) {
        // console.log(event.target.getAttribute('data-pet'))
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
    // console.log(event.target)
    if(event.target.classList.contains('popup-close') || event.target.classList.contains('popup-close-img') ||
    event.target.classList.contains('overlay')) {
        // console.log(event.target)
        popup.classList.remove('active')
        overlay.classList.remove('active')
        html.classList.remove('hidden')
    }
}

// window.addEventListener('click', () => console.log(event.target))
sliderItems.addEventListener('click', showBuildedPopup);
popupCloseBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);




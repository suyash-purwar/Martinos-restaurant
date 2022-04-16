const toggleCarouselEvent = (e) => {
    const carouselId = 'menu_carousel'+e.target.id.substr(-1);
    const carousel = document.querySelector('#'+carouselId);
    if (carousel.style.display === 'none') {
        carousel.style.display = 'block';
        hideAllCarouselsExcept(carouselId);
        const { currentDeckNo, noOfDecks } = manageMenuCarousel();
        manageCarouselButtonStates(currentDeckNo, noOfDecks);
        e.target.classList.add('menu__nav-item--active')
        document.querySelectorAll("[id^='menu_toggle_carousel']")
            .forEach(navItem => {
                if (navItem.id !== e.target.id) navItem.classList.remove('menu__nav-item--active');
            });
    }
};

const hideAllCarouselsExcept = (carouseId) => {
    const allCarousels = document.querySelectorAll(".menu__carousel");
    allCarousels.forEach(carousel => {
        if (carousel.id !== carouseId) carousel.style.display = "none";
    });
};

const manageMenuCarousel = () => {
    let currentCarDecks, currentDeck;
    Array.from(document.querySelectorAll(".menu__carousel")).map(carousel => {
        if (['block', ''].includes(carousel.style.display)) currentCarDecks = carousel.children;
    });
    Array.from(currentCarDecks).map(deck => {
        if (['grid', ''].includes(deck.style.display)) currentDeck = deck;
    });
    let currentDeckNo = +currentDeck.id.substr(-1);
    let noOfDecks = currentCarDecks.length;
    return { currentDeck, currentDeckNo, noOfDecks };
};

const manageCarouselButtonStates = (currentDeck, maxDeckNo) => {
    const btnLeft = document.querySelector("#menu_carousel_btn_left");
    const btnRight = document.querySelector("#menu_carousel_btn_right");
    if (currentDeck === 1) {
        btnLeft.style.backgroundColor = 'transparent';
        btnLeft.style.backgroundImage = 'url("./assets/icons/back-arrow-white.png")';
        btnLeft.style.opacity = '0.5'
        btnRight.style.backgroundColor = 'white';
        btnRight.style.backgroundImage = 'url("./assets/icons/forward-arrow-black.png")';
        btnRight.style.opacity = '1';
    } else if (currentDeck === maxDeckNo) {
        btnLeft.style.backgroundColor = 'white';
        btnLeft.style.backgroundImage = 'url("./assets/icons/back-arrow-black.png")';
        btnLeft.style.opacity = '1';
        btnRight.style.backgroundColor = 'transparent';
        btnRight.style.backgroundImage = 'url("./assets/icons/forward-arrow-white.png")';
        btnRight.style.opacity = '0.5';
    } else {
        btnLeft.style.backgroundColor = btnRight.style.backgroundColor = 'white';
        btnLeft.style.opacity = btnRight.style.opacity = '1';
        btnLeft.style.backgroundImage = 'url("./assets/icons/back-arrow-black.png")';
        btnRight.style.backgroundImage = 'url("./assets/icons/forward-arrow-black.png")';
    };
};

(function() {
    const menuNavBtns = document.querySelectorAll("[id^='menu_toggle_carousel']");
    menuNavBtns[0].addEventListener('click', toggleCarouselEvent);
    menuNavBtns[1].addEventListener('click', toggleCarouselEvent);
    menuNavBtns[2].addEventListener('click', toggleCarouselEvent);
    menuNavBtns[3].addEventListener('click', toggleCarouselEvent);
    menuNavBtns[4].addEventListener('click', toggleCarouselEvent);
    menuNavBtns[5].addEventListener('click', toggleCarouselEvent);
    menuNavBtns[6].addEventListener('click', toggleCarouselEvent);
    const carouselLeftBtn = document.querySelector("#menu_carousel_btn_left");
    const carouselRightBtn = document.querySelector("#menu_carousel_btn_right");
    carouselLeftBtn.addEventListener('click', (e) => {
        let { currentDeck, currentDeckNo, noOfDecks } = manageMenuCarousel();
        if (currentDeckNo > 1) {
            currentDeck.style.display = 'none';
            currentDeck.previousElementSibling.style.display = 'grid';
            currentDeck = currentDeck.previousElementSibling;
            currentDeckNo--;
            manageCarouselButtonStates(currentDeckNo, noOfDecks);
        }
    });
    carouselRightBtn.addEventListener('click', (e) => {
        let { currentDeck, currentDeckNo, noOfDecks } = manageMenuCarousel();
        if (currentDeckNo < noOfDecks) {
            currentDeck.style.display = 'none';
            currentDeck.nextElementSibling.style.display = 'grid';
            currentDeck = currentDeck.nextElementSibling;
            currentDeckNo++;
            manageCarouselButtonStates(currentDeckNo, noOfDecks);
        }
    });
})();
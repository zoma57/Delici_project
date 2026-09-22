let lastScrollTop = window.scrollY,
    navEle = document.querySelector("nav"),
    sections = document.querySelectorAll("header, section"),
    navLinks = document.querySelectorAll(".nav-links li a"),
    sideBarEle = document.querySelector(".side-bar"),
    sideBarBtn = document.querySelector(".sideBarButton"),
    sideBarExit = document.querySelector(".sideBarExit"),
    allPopups = document.querySelectorAll(".popUp"),
    popupExits = document.querySelectorAll(".popUp .exit"),
    bookingBtn = document.querySelector("header .booking"),
    bookingPopup = document.querySelector(".popUp.book"),
    nextSliderBtn = document.querySelector("#SC-Carousel .sc-carousel-button.next"),
    prevSliderBtn = document.querySelector("#SC-Carousel .sc-carousel-button.prev"),
    sliderIndicators = document.querySelectorAll(".sc-carousel-indicator"),
    menuTabs = document.querySelectorAll("#SC-Slider-Nav li.sc-nav-item");

window.addEventListener("load", function () {
    setTimeout(function () {
        let loadingScreen = document.querySelector(".loadingScreen");
        loadingScreen.classList.add("hide");
        document.body.classList.remove("loading");
        
        setTimeout(function () {
            loadingScreen.classList.add("d-none");
        }, 1000);
    }, 3000);

    showMenu(BreakFast, "breakfast");
    showMenu(Lunch, "lunch");
    showMenu(Dinner, "dinner");
    showMenu(Drinks, "drinks");

    let menuIcons = document.querySelectorAll(".open-menu-popup");
    menuIcons.forEach(function (icon) {
        icon.addEventListener("click", function (e) {
            e.preventDefault();
            let type = this.getAttribute("data-menu-type"),
                index = this.getAttribute("data-menu-index");
            getPopupData(type, index);
        });
    });
});

window.addEventListener("scroll", function () {
    lastScrollTop = checkNavScroll(navEle, lastScrollTop);
    updateActiveLink(sections);
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault(); 
        let sectionId = this.getAttribute("data-section-id"),
            targetSection = document.querySelector(`#${sectionId}`);
        
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth"
        });
    });
});

sideBarBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openPopup(sideBarEle);
});

sideBarExit.addEventListener("click", function (e) {
    e.preventDefault();
    closePopup(sideBarEle);
});

sideBarEle.addEventListener("click", function (e) {
    if (e.target === sideBarEle) {
        closePopup(sideBarEle);
    }
});

bookingBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openPopup(bookingPopup);
});

allPopups.forEach(function (popup, index) {
    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            closePopup(popup);
        }
    });
    
    if (popupExits[index]) {
        popupExits[index].addEventListener("click", function (e) {
            e.preventDefault();
            closePopup(popup);
        });
    }
});

nextSliderBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeSlide("next");
});

prevSliderBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeSlide("prev");
});

sliderIndicators.forEach(function (indicator) {
    indicator.addEventListener("click", function (e) {
        e.preventDefault();
        changeSlide(null, this.getAttribute("data-item-index"));
    });
});

menuTabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector("#SC-Slider-Nav li.active").classList.remove("active");
        document.querySelector("#SC-Slider-Content .sc-slider-item.active").classList.remove("active", "show");

        this.classList.add("active");
        
        let targetId = this.getAttribute("data-slider-item"),
            targetContent = document.querySelector(`#SC-Slider-Content .sc-slider-item[data-slider-item="${targetId}"]`);
        
        targetContent.classList.add("active");
        
        setTimeout(function () {
            targetContent.classList.add("show");
        }, 10);
    });
});

let menuArrows = document.querySelectorAll(".popUp.menu .arrow");
menuArrows.forEach(function (arrow) {
    arrow.addEventListener("click", function (e) {
        e.preventDefault();
        let type = this.getAttribute("data-menu-type"),
            index = this.getAttribute("data-menu-index");
        getPopupData(type, index);
    });
});
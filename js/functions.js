function openPopup (element) {
    element.classList.add("active");
    setTimeout(function () {
        element.classList.add("show");
    }, 10);
}

function closePopup (element) {
    element.classList.remove("show");
    setTimeout(function () {
        element.classList.remove("active");
    }, 500);
}

function checkNavScroll (navElement, lastScrollValue) {
    let currentScroll = window.scrollY;

    if (currentScroll >= 50) {
        navElement.classList.add("scrolled");
    } else {
        navElement.classList.remove("scrolled");
    }

    if (currentScroll > lastScrollValue) {
        navElement.classList.add("up");
    } else {
        navElement.classList.remove("up");
    }
    
    return currentScroll;
}

function updateActiveLink (sections) {
    let currentScroll = window.scrollY;

    sections.forEach(function(section) {
        let sectionTop = section.offsetTop - 50,
            sectionBottom = sectionTop + section.offsetHeight,
            sectionId = section.getAttribute("id");

        if (currentScroll >= sectionTop && currentScroll <= sectionBottom) {
            let activeLinks = document.querySelectorAll(".nav-links li.active");
            activeLinks.forEach(function(activeLi) {
                activeLi.classList.remove("active");
            });
            
            let targetLinks = document.querySelectorAll(`.nav-links li a[data-section-id="${sectionId}"]`);
            targetLinks.forEach(function(link) {
                link.parentElement.classList.add("active");
            });
        }
    });
}

function showMenu (menuArray, categoryName) {
    let container = document.querySelector(`.sc-slider-item.${categoryName} .row`),
        part1HTML = "",
        part2HTML = "";

    if (container) {
        menuArray.forEach(function (item, index) {
            let marginClass = "mb-5";
            
            if (index == 2 || index == 5) {
                marginClass = "mb-5 mb-md-0";
            }

            let itemHTML = `
                <div class="row align-items-center unit ${marginClass}" data-menu-index="${index}">
                    <div class="col-4 col-md-5 col-lg-3">
                        <div class="frame m-auto mb-md-0">
                            <div class="layout">
                                <i class="fa-regular fa-square-plus open-menu-popup" data-menu-type="${categoryName}" data-menu-index="${index}"></i>
                            </div>
                            <div class="img" style="background-image: url('./images/${item.images[0]}')"></div>
                        </div>
                    </div>
                    <div class="col-8 col-md-7 col-lg-9">
                        <div class="body">
                            <div class="title">
                                <h5 class="name mb-0">${item.name}</h5>
                                <span class="mb-0 mx-3" style="flex-grow:1; border-bottom:1px solid #a7a7a7;"></span>
                                <h5 class="price mb-0">$${item.price.toFixed(2)}</h5>
                            </div>
                            <p class="mb-0 mt-2">${item.miniDescription}</p>
                        </div>
                    </div>
                </div>
            `;

            if (index < 3) {
                part1HTML += itemHTML;
            } else {
                part2HTML += itemHTML;
            }
        });

        container.innerHTML = `
            <div class="col-md-6 part1 pe-md-4 pe-lg-5">
                <div class="item">${part1HTML}</div>
            </div>
            <div class="line"></div>
            <div class="col-md-6 part2 ps-md-4 ps-lg-5">
                <div class="item">${part2HTML}</div>
            </div>
        `;
    }
}

function getPopupData (type, index) {
    let selectedArray = [],
        popupEle = document.querySelector(".popUp.menu");

    if (type === 'breakfast') {
        selectedArray = BreakFast;
    } else if (type === 'lunch') {
        selectedArray = Lunch;
    } else if (type === 'dinner') {
        selectedArray = Dinner;
    } else if (type === 'drinks') {
        selectedArray = Drinks;
    }

    let item = selectedArray[index],
        prevBtn = popupEle.querySelector(".arrow.prev"),
        nextBtn = popupEle.querySelector(".arrow.next"),
        prevIndex = 0,
        nextIndex = 0;

    popupEle.querySelector(".name").textContent = item.name;
    popupEle.querySelector(".img img").setAttribute("src", `./images/${item.images[0]}`);
    popupEle.querySelector(".price").textContent = `$${item.price.toFixed(2)}`;
    popupEle.querySelector("p").textContent = item.description;

    if (index == 0) {
        prevIndex = selectedArray.length - 1;
    } else {
        prevIndex = parseInt(index) - 1;
    }

    if (index == selectedArray.length - 1) {
        nextIndex = 0;
    } else {
        nextIndex = parseInt(index) + 1;
    }

    prevBtn.setAttribute("data-menu-type", type);
    prevBtn.setAttribute("data-menu-index", prevIndex);
    
    nextBtn.setAttribute("data-menu-type", type);
    nextBtn.setAttribute("data-menu-index", nextIndex);

    openPopup(popupEle);
}
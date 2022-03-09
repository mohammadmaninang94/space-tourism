const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;
const changeTabFocus = (e) => {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        }

        if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
};

const changeTabPanel = (e) => {
    const targetTab = e.target;
    const targetName = targetTab.getAttribute('data-name');
    const destination = destinations[targetName];
    const article = document.querySelector('.destination-details');
    const articleTitle = article.querySelector('h2');
    const articleDescription = article.querySelector('p');
    const articleDistance = article.querySelector('.distance-box div:first-of-type p');
    const articleTravel = article.querySelector('.distance-box div:last-of-type p');
    const planetImage = document.querySelector('.planet-image');

    articleTitle.textContent = destination.name;
    articleDescription.textContent = destination.description;
    articleDistance.textContent = destination.distance;
    articleTravel.textContent = destination.travel;
    planetImage.querySelector('source').setAttribute('srcset', destination.images.webp);
    planetImage.querySelector('img').setAttribute('src', destination.images.png);
    planetImage.querySelector('img').setAttribute('alt', destination.name);

    const previousTab = document.querySelector('[role="tab"][aria-selected="true"]');
    previousTab.setAttribute('aria-selected', false);
    targetTab.setAttribute('aria-selected', true);
};

if (tabList) {
    tabList.addEventListener('keydown', changeTabFocus);

    tabs.forEach((tab) => {
        tab.addEventListener('click', changeTabPanel);
    });
}
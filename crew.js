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
    const targetRole = targetTab.getAttribute('data-role');
    const crew = crews[targetRole];
    const article = document.querySelector('.crew-details');
    const articleRole = article.querySelector('h3');
    const articleName = article.querySelector('h2');
    const articleDescription = article.querySelector('p');
    const picture = document.querySelector('picture');

    articleRole.textContent = crew.role;
    articleName.textContent = crew.name;
    articleDescription.textContent = crew.bio;
    picture.querySelector('source').setAttribute('srcset', crew.images.webp);
    picture.querySelector('img').setAttribute('src', crew.images.png);

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
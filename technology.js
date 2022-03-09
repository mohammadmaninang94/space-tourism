const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;
const changeTabFocus = (e) => {
    const keydownLeft = 37;
    const keydownRight = 39;
    const keydownUp = 38;
    const keydownDown = 40;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight ||
        e.keyCode === keydownUp || e.keyCode === keydownDown) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight ||
            e.keyCode === keydownDown) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft ||
            e.keyCode === keydownUp) {
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
    const technology = technologies[targetName];
    const article = document.querySelector('.technology-details');
    const articleName = article.querySelector('h2');
    const articleDescription = article.querySelector('.technology-description');
    const picture = document.querySelector('picture');

    articleName.textContent = technology.name;
    articleDescription.textContent = technology.description;
    picture.querySelector('source').setAttribute('srcset', technology.images.portrait);
    picture.querySelector('img').setAttribute('src', technology.images.landscape);
    picture.querySelector('img').setAttribute('alt', technology.name);

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
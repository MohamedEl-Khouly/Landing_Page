/**
 *A simple script responsible for building the navbar
 *automatically through the section elements available
 *in the main element. It also handles the transition of
 *from navbar to different sections.
 *
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 * @author Mohamed El-Khouly <msirag95@gmail.com>
*/

/**
 * Define Global Variables
 *
*/
const   pageSections = document.querySelectorAll('section'),
        footerAnchor = document.querySelector("footer a"),
        burgerButton = document.querySelector('.burger'),
        logoAnchor   = document.querySelector('.logo a'),
        navbarList   = document.querySelector('.navbar_list ul'),
        navbarDiv    = document.querySelector('.navbar_list');

let     activeSection = pageSections[0],
        navbarAnchors = null,
        activeAnchor  = null ;


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
* @description function clears the active Class from Anchors and Sections.
*
*/
function clearActiveClass() {
    activeAnchor.parentElement.classList.remove('active_anchor');
    activeSection.classList.remove('your-active-class');
}

/**
* @description function checks is element is on viewport.
*
*/
function isInViewport(elem) {
    let bounding = elem.getBoundingClientRect();
    return (
        ((window.innerHeight || document.documentElement.clientHeight)>=bounding.top)&&
        bounding.top>=0
    );
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
/**
* @description Function responsible for building the nav bar list through collecting data from HTML sections
*
*/
function navbarBuilder() {
    pageSections.forEach(section =>{
        const newLiElement = document.createElement('li');
        newLiElement.innerHTML=`<a href=#${section.id} id="${section.id}Anchor">${section.dataset.nav}</a>`;
        navbarList.appendChild(newLiElement);
    });
}

/**
* @description Function adds the active Class from Anchors and Sections.
*/
function addActiveClass(){
    activeSection.classList.add('your-active-class');
    activeAnchor.parentElement.classList.add('active_anchor');
}

/**
* @description Function handles the navbar anchors listener actions through
* disabling the anchors default action, clearing previous active classes,
* navigating to the new section through a scroll animation
* and setting the new active classes.
*/
function scrollToSection(event){
    event.preventDefault();
    clearActiveClass();
    activeAnchor=event.srcElement;
    activeSection = document.querySelector(activeAnchor.getAttribute('href'));
    scrollTo(activeSection);
    addActiveClass();
}

/**
* @description Function adds the active Class from Anchors and Sections.
* @param {string} id - The location to scroll to
*/
function scrollTo(id){
    id.scrollIntoView({
        behavior: 'smooth'
    });

}

/**
 * End Main Functions
 * Begin Events
 *
*/

/**
* Build method Call
*/
navbarBuilder();
navbarAnchors = document.querySelectorAll('.navbar_list  a');
activeAnchor = navbarAnchors[0];
/**
* Adding listeners to navbar anchors
*/
navbarAnchors.forEach(item =>{
    item.addEventListener('click',scrollToSection);
});
/**
* @description Burger button event handler. Burger button only functions when display
* screen less than 450px in width. It handles the navbar visibility on screen.
*/
burgerButton.addEventListener('click', ()=>{
    navbarDiv.classList.toggle('active_list');
});

/**
* @description logo anchor listener takes you to the top of the page
*/
logoAnchor.addEventListener('click', (event)=>{
    event.preventDefault();
    scrollTo(document.querySelector(event.srcElement.getAttribute('href')));
});
/**
* @description footer anchor listener takes you to the top of the page
*/
footerAnchor.addEventListener('click', (event)=>{
    event.preventDefault();
    scrollTo(document.querySelector(event.srcElement.getAttribute('href')));
});

/**
* @description event listener handles which section is on screen and adds active class to it.
*
*/
pageSections.forEach((section) =>{
    window.addEventListener('scroll',()=>{
        if (isInViewport(section)) {
            clearActiveClass();
            activeSection = section;
            activeAnchor= document.querySelector(`#${section.id}Anchor`);
            addActiveClass();
        }
    });
});




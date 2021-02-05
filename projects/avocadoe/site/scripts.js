/*eslint-env browser*/

let navBg = document.getElementById("nav");
let dropDown = document.getElementById("dropdown");
let shopCart = document.getElementById("cart");
let menuButton = document.getElementById("menu");
let cartPop = document.getElementById("cartMan");

//handles the dropdown view
function menu() {
    menuButton.classList.toggle("cross");
    navBg.classList.toggle("nav-solid");
    dropDown.classList.toggle("dropdown");
    shopCart.classList.toggle("cart");
    for(const dropAnchor of dropDown.children) dropAnchor.classList.toggle('dropanchor');
}

//exits out of the dropdown view when the browser window is resized to be bigger than 760px
window.onresize = () =>  {
    if (window.innerWidth >= 760) {
        menuButton.classList.remove("cross");
        navBg.classList.remove("nav-solid");
        dropDown.classList.remove("dropdown");
        shopCart.classList.remove("cart");
        for(const dropAnchor of dropDown.children) dropAnchor.classList.remove('dropanchor');
    }  
};

//scrolls to the top of the screen
function toTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//closes the dropdown menu when a button is clicked
function dismissMenu() {
        menuButton.classList.remove("cross");
        navBg.classList.remove("nav-solid");
        dropDown.classList.remove("dropdown");
        shopCart.classList.remove("cart");
        for(const dropAnchor of dropDown.children) dropAnchor.classList.remove('dropanchor');
}

//shows and then dismisses the cart menu
function noCart() {
    cartPop.classList.toggle("nocart");
    setTimeout(() => cartPop.classList.toggle("nocart-text"), 250);
    
    setTimeout(() => cartPop.classList.remove("nocart"), 2500);
    setTimeout(() => cartPop.classList.remove("nocart-text"), 2250);
}

//Scroll Reveal animation taken from scrollrevealjs.org
ScrollReveal().reveal('.lol', {
    duration: 1000,
    viewOffset: {
    bottom: 525
    },
    easing: 'cubic-bezier(.65,.05,.45,.95)',
    distance: '20px',
    origin: 'bottom',
});
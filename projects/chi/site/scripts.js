let nav = document.getElementById("nav");
let logo = document.getElementById("logo");
let menuButton = document.getElementById("menu-button");
let mobileNav = document.getElementById("nav-button");
let bagTxt = document.getElementById("bagTxt");
let prodGrid = document.getElementById("catalog");
let arrow = document.getElementById("arrow");
let prodCon = document.querySelectorAll(".product-wrap");
let prodChild = prodCon.childNodes;
let addtoBag = document.querySelector('.add-to-bag');

//Skrinks the nav on scroll
window.onscroll = () => {
    if(document.body.scrollTop >= 10 || document.documentElement.scrollTop >= 10) {
        nav.style.height = "62px";
        nav.style.backgroundColor = "var(--accent)";
//        logo.src = "img/logo-s.svg";
//        logo.style.height = "45%";
        menuButton.style.fontSize = "1.7em";
        mobileNav.style.top = "62px";
        } else {
        nav.style.height = "100px";
        nav.style.backgroundColor = "var(--accent2)";
//        logo.src = "img/logo.svg";
//        logo.style.height = "40%";
        menuButton.style.fontSize = "2.5em";
        mobileNav.style.top = "100px";
    }
}

//Controls hamburger menu
function navAppear(){
    nav.classList.toggle("black");
    mobileNav.classList.toggle("nav-appear");
    menuButton.classList.toggle("yellow");
}

//Bag empty message
function bagAppear(){
    bagTxt.classList.toggle("bagAppear");
    setTimeout(() => bagTxt.classList.toggle("bagTxt"), 200);
    
    setTimeout(() => bagTxt.classList.remove("bagAppear"), 1700);
    setTimeout(() => bagTxt.classList.remove("bagTxt"), 1500);
}

//Resets the nav state when the browser window is resized
window.onresize = () => {
    if (window.innerWidth >= 720) {
        nav.classList.remove("black");
        mobileNav.classList.remove("nav-appear");
        menuButton.classList.remove("yellow");
    }
}

//Sorts the product grid
function sortGrid(){
    prodGrid.classList.toggle("reverse");
    arrow.classList.toggle("reverseArrow");
}

//Change the product grid view
function listView(){
    prodCon.forEach(prod =>{
        prod.classList.add('listview');
        prod.querySelector('span').classList.add('listview-name');
        prod.querySelectorAll('img')[0].classList.remove('brand');
        prod.querySelectorAll('img')[0].classList.add('listview-brand');
        prod.querySelectorAll('img')[1].classList.remove('prod-img');
        prod.querySelectorAll('img')[1].classList.add('listview-img');
        prod.querySelectorAll('p')[1].classList.add('prod-para');
        document.getElementById('sorter').querySelector('.fa-th').classList.remove('sorter-active');
        document.getElementById('sorter').querySelector('.fa-th-list').classList.add('sorter-active');
    });
}

function gridView(){
    prodCon.forEach(prod =>{
        prod.classList.remove('listview');
        prod.querySelector('span').classList.remove('listview-name');
        prod.querySelectorAll('img')[0].classList.add('brand');
        prod.querySelectorAll('img')[0].classList.remove('listview-brand');
        prod.querySelectorAll('img')[1].classList.add('prod-img');
        prod.querySelectorAll('img')[1].classList.remove('listview-img');
        prod.querySelectorAll('p')[1].classList.remove('prod-para');
        document.getElementById('sorter').querySelector('.fa-th').classList.add('sorter-active');
        document.getElementById('sorter').querySelector('.fa-th-list').classList.remove('sorter-active');
    });
}

//Product modal view
prodCon.forEach(prod =>{
    prod.addEventListener('click', () =>{
        prod.classList.add('modal');
        prod.querySelector('span').classList.add('modal-name');
        prod.querySelectorAll('img')[1].classList.add('modal-img');
        prod.querySelectorAll('img')[0].classList.add('modal-brand');
        document.querySelector('.fa-window-close').classList.add('close-button');
        if (prod.className.match('listview')){
            prod.querySelectorAll('p')[1].classList.add('modal-desp');
            addtoBag.classList.add('bag-list');
        } else {addtoBag.classList.add('bag-grid');}
    });
    
    document.querySelector('.fa-window-close').addEventListener('click', () =>{
        prod.classList.remove('modal');
        prod.querySelector('span').classList.remove('modal-name');
        prod.querySelectorAll('img')[1].classList.remove('modal-img');
        prod.querySelectorAll('img')[0].classList.remove('modal-brand');
        document.querySelector('.fa-window-close').classList.remove('close-button');
        if (prod.className.match('listview')){
            prod.querySelectorAll('p')[1].classList.remove('modal-desp');
            addtoBag.classList.remove('bag-list')
        }  else {addtoBag.classList.remove('bag-grid');}
    });
});

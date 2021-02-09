const swup = new Swup();

const menuButton = document.querySelector('#hamburger');
const navBar = document.querySelector('nav');
const workButton = navBar.querySelector('ul a:nth-of-type(2)');
const darkButton = navBar.querySelector('div button:first-of-type');
const motionButton = navBar.querySelector('div button:last-of-type');
let oldScroll = 0;
let expireTime = new Date();
expireTime.setTime(expireTime.getTime() + 604800*1000);
//get desired cookie
getCookie = (x) =>{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${x}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

//dark mode function
//check and set a cookie for the settings mode
setMode = () => {
    //check if it is already in dark mode
    if (getCookie("settings") == "dark") {
        document.cookie = "settings=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else {
        document.cookie = "settings=" + "dark" + "; expires=" + expireTime.toUTCString() +"; path=/;";
    }
    document.documentElement.classList.toggle("dark");
}
darkButton.addEventListener('click', setMode);

//reduce motion toggle
motionButton.addEventListener('click', () => {
    if (!document.documentElement.classList.contains('re-mo')){
        document.documentElement.classList.add('re-mo');
        destrVanilla();
    } else {
        document.documentElement.classList.remove('re-mo');
        initVanilla();
    }
})

//toggle menu and lock scroll
toggleMenu = () => {
    navBar.classList.toggle('menu-active');
    document.body.classList.toggle('scroll-lock');
}
menuButton.addEventListener('click', toggleMenu);

//close menu if the user clicks anywhere outside the container
bgClick = () => {
    document.addEventListener('click', (event) => {
        if((!navBar.contains(event.target)) && navBar.className.includes('menu-active')){
            toggleMenu();
        }
    })
}
bgClick();

//scroll events
window.addEventListener('scroll', () => {
    //hide the navbar when the window is scrolled down and vice versa
    if (window.matchMedia('screen and (max-width:700px)').matches){
        let newScroll = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
        if (newScroll > 0 && newScroll >= oldScroll){
            oldScroll = newScroll;
            navBar.style.top = '-200px';
        } else {
            oldScroll = newScroll;
            navBar.style.top = 'calc(1.1vw + 0.5rem)';
        }
    } else {navBar.style.top = '';}
})

//initiate vanilla tilt on navbar
VanillaTilt.init(navBar, {
    perspective: 1000,
    max: 11,
    easing: "cubic-bezier(0.33, 1, 0.68, 1)"
});

//assign button to scroll content
scrollButtons = (a, b, c) => {
    console.log('ran');
    if (a){
        console.log('true');
        a.addEventListener('click', () => {
            b.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            if (c == 1){
                toggleMenu();
            };
        });
    }
}
//nav contact button
scrollButtons(navBar.querySelector('ul a:last-of-type'), document.querySelector('footer'), 1);

init = () => {
    const tilt =  document.querySelectorAll('.tilt');
    const fullImg = document.querySelectorAll('.full-img');
    
    //check if the page address contains projects section the scrolls to top
    if (!window.location.href.includes('#projects')){
        window.scrollTo(0, 0);
    } else {
        document.querySelector('#projects').scrollIntoView();
    }
    
    //inititalize relax
    if (document.querySelector('.about header > *')){
        var rellax = new Rellax('.about header > *', {
            center: true,
        });
    }
    if (document.querySelector('.home header')){
        var rellax = new Rellax('.home header > *:not(.gradie)', {
            center: true,
        });
    }

    //initialize flickity
    if (document.querySelector('.main-carousel')){
        var flkty = new Flickity('.main-carousel', {
            cellSelector: '.carousel-cell',
            wrapAround: true,
            imagesLoaded: true,
        });
    }

    //initialize vanilla tilt
    initVanilla = () => {
        if (!document.documentElement.classList.contains('re-mo')){
            if (tilt){
                VanillaTilt.init(tilt, {
                    perspective: 800,
                    easing: "cubic-bezier(0.33, 1, 0.68, 1)"
                });
            }
            if (fullImg){
                VanillaTilt.init(fullImg, {
                    perspective: 1000,
                    max: 11,
                    easing: "cubic-bezier(0.33, 1, 0.68, 1)"
                });
            }
        }
    }
    initVanilla();
    
    //destroy vanilla tilt
    destrVanilla = () =>{
        if (tilt[0]){tilt.forEach(tlit => {tlit.vanillaTilt.destroy();});}
        if (fullImg[0]){fullImg.forEach(fImg => {fImg.vanillaTilt.destroy();});}
    }

    //modal function
    modalCheck = (x) =>{
        if (!x.classList.contains('modal')){
            if (!document.documentElement.classList.contains('re-mo')){destrVanilla();}
            x.classList.add('modal');
            document.body.classList.add('scroll-lock', 'modal');
        } else {
            if (!document.documentElement.classList.contains('re-mo')){initVanilla();}
            x.classList.remove('modal');
            document.body.classList.remove('scroll-lock', 'modal');
        }
    }
    if (fullImg[0]){
        fullImg.forEach(lilimg => {lilimg.addEventListener('click', () => {modalCheck(lilimg);})})
    }
    
    //read-more button on project pages
    scrollButtons(document.querySelector('.read-more'), document.querySelector('#process'), 0);
    //home nav navigation
    if (document.querySelector('.home')){
        scrollButtons(document.querySelector('header h3'), document.querySelector('#projects'), 0);
    }
    //about page button
    scrollButtons(document.querySelector('.about header a'), document.querySelector('#contact'), 0);
    
    //nav work button, since it is not replaced by swup, workarounds are needed
    if (document.querySelector('.home')){
        workButton.setAttribute("href", "#projects");
        workButton.setAttribute("data-no-swup", "");
        document.documentElement.classList.add('scroll-smooth');
        workButton.addEventListener('click', toggleMenu);
    } else {
        workButton.setAttribute("href", "/#projects");
        workButton.removeAttribute("data-no-swup");
        workButton.removeEventListener('click', toggleMenu);
    }
    
    //change mode by what is set in cookie
    keepMode = () => {
        if (getCookie("settings") != undefined) {
            document.documentElement.classList.add(getCookie("settings"));
        } else {
            document.documentElement.classList.remove('undefined');
        }
    };
    keepMode();
}

init();
swup.on('contentReplaced', init);

unload = () => {
    document.querySelector('nav').classList.remove('menu-active');
    document.body.classList.remove('scroll-lock');
    document.documentElement.classList.remove('scroll-smooth');
}
swup.on('willReplaceContent', unload);
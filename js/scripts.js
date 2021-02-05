const swup = new Swup();

const menuButton = document.querySelector('#hamburger');
const navBar = document.querySelector('nav');
const darkButton = navBar.querySelector('div button:first-of-type');
const motionButton = navBar.querySelector('div button:last-of-type');
const readButton = document.querySelector('.read-more');
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
        destrVanilla();
        document.documentElement.classList.add('re-mo');
    } else {
        initVanilla();
        document.documentElement.classList.remove('re-mo');
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

init = () => {
    if (!window.location.href.includes('#projects')){
        window.scrollTo(0, 0);
    } else {
        document.querySelector('#projects').scrollIntoView({
            behaviour: "smooth",
            block: "start"
        })
    }
    
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
    
    const tilt =  document.querySelectorAll('.tilt');
    const fullImg = document.querySelectorAll('.full-img');

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
        if (tilt){
            VanillaTilt.init(tilt, {
                perspective: 670,
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
    if (document.querySelectorAll('.full-img')[0]){
        document.querySelectorAll('.full-img').forEach(lilimg => {
            lilimg.addEventListener('click', () => {
                modalCheck(lilimg);
            })
        })
    }
    
    //assign button to scroll content
    scrollButtons = (a, b, c) => {
        if (a){
            a.addEventListener('click', () => {
                b.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
                if (c == 1){
                    toggleMenu();
                }
            })
        }
    }
    scrollButtons(readButton, document.querySelector('#process'), 0);
    if (document.querySelector('.home')){
        scrollButtons(navBar.querySelector('ul a:nth-of-type(2)'), document.querySelector('#projects'), 1);
        scrollButtons(document.querySelector('header h3'), document.querySelector('#projects'), 0);
    }
    scrollButtons(navBar.querySelector('ul a:last-of-type'), document.querySelector('footer'), 1);
    scrollButtons(document.querySelector('.about header a'), document.querySelector('#contact'), 0);
    
    keepMode = () => {
        //change mode by what is set in cookie
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
}
swup.on('willReplaceContent', unload);
const menuButton = document.querySelector('#hamburger');
const navBar = document.querySelector('nav');
const darkButton = navBar.querySelector('div button:first-of-type');
const motionButton = navBar.querySelector('div button:last-of-type');
let oldScroll = 0;
const currentPath = window.location.pathname;
let expireTime = new Date();
expireTime.setTime(expireTime.getTime() + 604800*1000);
//get desired cookie
getCookie = (x) =>{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${x}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

//initialize vanilla tilt
VanillaTilt.init(document.querySelectorAll('.tilt'), {
    perspective: 420,
    easing: "cubic-bezier(0.33, 1, 0.68, 1)"
});
VanillaTilt.init(document.querySelector('.tilt-nav'), {
    perspective: 1000,
    max: 11,
    easing: "cubic-bezier(0.33, 1, 0.68, 1)"
});

//toggle menu and lock scroll
toggleMenu = () => {
    navBar.classList.toggle('menu-active');
    document.body.classList.toggle('scroll-lock');
}
menuButton.addEventListener('click', toggleMenu);

//close menu if the user clicks anywhere outside the container
document.addEventListener('click', (event) => {
    if((!navBar.contains(event.target)) && navBar.className.includes('menu-active')){
        toggleMenu();
    }
})

//reduce motion toggle
motionButton.addEventListener('click', () => {
    if (!document.documentElement.classList.contains('re-mo')){
        document.querySelectorAll('.tilt').forEach(tlit => {
            tlit.vanillaTilt.destroy();
        });
        document.querySelector('.tilt-nav').vanillaTilt.destroy();
        document.documentElement.classList.add('re-mo');
    } else {
        VanillaTilt.init(document.querySelectorAll('.tilt'), {
            perspective: 420, easing: "cubic-bezier(0.33, 1, 0.68, 1)"
        });
        VanillaTilt.init(document.querySelector('.tilt-nav'), {
            perspective: 1000, max: 11, easing: "cubic-bezier(0.33, 1, 0.68, 1)"
        });
        document.documentElement.classList.remove('re-mo');
    }
})

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
            navBar.style.top = '';
        }
    }
})

//dark mode settings
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
keepMode = () => {
    //change mode by what is set in cookie
    if (getCookie("settings") != undefined) {
        document.documentElement.classList.add(getCookie("settings"));
    } else {
        document.documentElement.classList.remove('undefined');
    }
};
keepMode();
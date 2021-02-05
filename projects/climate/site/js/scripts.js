/*eslint-env browser*/
const options = {
  linkSelector:
    'a[href^="' +
    window.location.origin +
    '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup]), a[href^="."]:not([data-no-swup]), a[href^=".."]:not([data-no-swup])'
};
const swup = new Swup(options);
init = () => {
    window.scrollTo(0, 0);
    const navBar = document.querySelector('nav');
    const settingsButton = document.querySelector('nav > button');
    let expireTime = new Date();
    expireTime.setTime(expireTime.getTime() + 604800*1000);
    //get desired cookie
    getCookie = (x) =>{
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${x}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    //toggle the settings panel
    toggleSettings = () => {
        if (navBar.className != 'settings'){
            navBar.classList.add('settings');
            bodyScrollLock.disableBodyScroll(navBar, {
                 reserveScrollBarGap: true,
            });
        } else {
            navBar.classList.remove('settings');
            bodyScrollLock.enableBodyScroll(navBar)
        }
    }
    settingsButton.addEventListener('click', toggleSettings);

    //check and set a cookie for the settings mode
    setMode = (a, b) => {
        document.body.classList.remove(b);
        if (getCookie("settings") == a) {
            document.cookie = "settings=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
            document.cookie = "settings=" + a + "; expires=" + expireTime.toUTCString() +"; path=/;";
        }
        document.body.classList.toggle(a);
    }

    document.querySelector('nav div button:first-child').addEventListener('click', () => setMode("dark", "contrast"));
    document.querySelector('nav div button:last-child').addEventListener('click', () => setMode("contrast"));

    keepMode = () => {
        //change mode by what is set in cookie
        if (getCookie("settings") != undefined) {
            document.body.classList.add(getCookie("settings"));
        } else {
            document.body.classList.remove('undefined');
        }
    };
    keepMode();

    //return array of all siblings of element
    getSiblings = (elem, namae) => {
        let siblings = [];
        nextElem = elem.parentNode.firstElementChild;
        while (nextElem){
            if (nextElem.nodeType === 1 && nextElem != elem && nextElem.matches(namae)) {
                siblings.push(nextElem);
            }
            nextElem = nextElem.nextElementSibling;
        }
        return(siblings);
    }

    //turn items into selection group
    selectionGroup = (elemClass) => {
        if (document.querySelectorAll(elemClass)){
            document.querySelectorAll(elemClass).forEach(selection => {
                selection.addEventListener('click', () => {
                    selection.classList.remove('inactive'); selection.classList.add('active');
                    selection.nextElementSibling.classList.add('active');
                    getSiblings(selection, '.hover-bg').forEach(sibling => {
                        sibling.classList.remove('active'); sibling.classList.add('inactive');
                        sibling.nextElementSibling.classList.remove('active');
                    });
                });
            });
        };
    };
    selectionGroup('.overview .hover-bg');
    selectionGroup('.history .hover-bg');
    selectionGroup('.stats .hover-bg');

    //intiate dropdown menu
    if(document.querySelector('.charts ul > span')){
        document.querySelector('.charts ul > span').addEventListener('click', () => {
            document.querySelector('.charts ul').classList.toggle('dropdown');
        })
    }

    //dropdown control for charts
    document.querySelectorAll('.charts li').forEach(chartList => {
        chartList.addEventListener('click', () => {
            document.querySelector('.charts ul').classList.remove('dropdown');
            if (chartList.className !== 'protein') {
                document.querySelector('.charts section').classList.remove(window.sessionStorage.getItem('chartGraph'))
                document.querySelector('.charts section').classList.add(chartList.className);
                window.sessionStorage.setItem('chartGraph', chartList.className);
            } else {
                 document.querySelector('.charts section').className = "";
            }
        })
    });

    //scroll screen to top when a section is opened
    if (document.querySelector('.stats')){
        document.querySelectorAll('.hover-bg').forEach(butTon => {
            butTon.addEventListener('click', () => {
                window.scrollTo(0, 0);
            })
        })
    };

    //initate scrollreveal
    if (document.querySelector('.moral')){
        ScrollReveal().reveal('.reveal', {
            viewOffset: {
                bottom: 250,
            },
            duration: 700,
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
            distance: '100px',
            origin: 'left',
            reset: true,
        });
    };
}

document.addEventListener('DOMContentLoaded', init);
swup.on('contentReplaced', init);

unload = () => {
    bodyScrollLock.enableBodyScroll(document.querySelector('nav'));
}
swup.on('willReplaceContent', unload);
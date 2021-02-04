const menuButton = document.querySelector('#hamburger');
const navBar = document.querySelector('nav');

toggleMenu = () => {
    navBar.classList.toggle('menu-active');
}

menuButton.addEventListener('click', toggleMenu);

VanillaTilt.init(document.querySelectorAll('.tilt')[1], {
    perspective: 500,
});
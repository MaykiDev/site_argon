const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu ul li a');

function toggleMenu() {

    navMenu.classList.toggle('nav-active');

    navToggle.classList.toggle('toggle');

    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

    navToggle.setAttribute('aria-expanded', !isExpanded);

    navToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu principal' : 'Fechar menu principal');
}

navToggle.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {

        if (window.innerWidth <= 768) {
            navMenu.classList.remove('nav-active');
            navToggle.classList.remove('toggle');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Abrir menu principal');
        }
    });
});
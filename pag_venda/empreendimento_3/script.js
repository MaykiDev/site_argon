// Cursor Personalizado
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Slider Simples
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
let current = 0;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
});

prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
});

// Efeito de Hover nos botões
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(3)';
        cursor.style.background = 'rgba(39, 56, 38, 0.1)';
    });
    btn.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'transparent';
    });
});
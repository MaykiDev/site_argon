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
// Localize esta linha no final do seu script.js e mude para:
const buttons = document.querySelectorAll('button, .primary-btn, .secondary-btn');

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


// Seletores dos elementos do modal
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('img-full');
const closeBtn = document.querySelector('.close-modal');
const mPrevBtn = document.getElementById('modal-prev');
const mNextBtn = document.getElementById('modal-next');

let modalIndex = 0; // Controla qual imagem está no modal

// Função para atualizar a imagem exibida no modal
function updateModalImage(index) {
    modalIndex = index;
    modalImg.src = slides[modalIndex].src;
}

// Abre o modal e define o index inicial baseado na foto clicada
slides.forEach((slide, index) => {
    slide.onclick = () => {
        modal.style.display = "flex";
        updateModalImage(index);
        if(window.innerWidth > 1024) cursor.style.display = 'none';
    };
});

// Botão Próximo (Modal)
mNextBtn.onclick = (e) => {
    e.stopPropagation();
    modalIndex = (modalIndex + 1) % slides.length;
    updateModalImage(modalIndex);
};

// Botão Anterior (Modal)
mPrevBtn.onclick = (e) => {
    e.stopPropagation();
    modalIndex = (modalIndex - 1 + slides.length) % slides.length;
    updateModalImage(modalIndex);
};

// Fechar Modal
closeBtn.onclick = () => {
    modal.style.display = "none";
    cursor.style.display = 'block';
};

// Atalho de teclado: Setas para passar as fotos
document.addEventListener('keydown', (e) => {
    if (modal.style.display === "flex") {
        if (e.key === "ArrowRight") mNextBtn.onclick(e);
        if (e.key === "ArrowLeft") mPrevBtn.onclick(e);
        if (e.key === "Escape") closeBtn.onclick();
    }
});
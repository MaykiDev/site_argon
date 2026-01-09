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

// --- Lógica do Carrossel ---
const wrapper = document.getElementById('carousel-wrapper');
const slides = document.querySelectorAll('.carousel-slide');
const indicatorsContainer = document.getElementById('carousel-indicators');
let currentIndex = 0;

// 1. Cria e Adiciona os Indicadores (Pontos)
function createIndicators() {
    slides.forEach((slide, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });
}

// 2. Função para Mudar o Slide
function goToSlide(index) {
    if (index < 0 || index >= slides.length) {
        return; // Evita índices inválidos
    }
    currentIndex = index;
    
    // Calcula o quanto o wrapper deve se mover
    const offset = -currentIndex * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
    
    updateIndicators();
}

// 3. Atualiza os Indicadores Ativos
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentIndex) {
            indicator.classList.add('active');
        }
    });
}

// 4. Inicialização
createIndicators();

// 5. Autoplay (Opcional: Deixa o carrossel rodando sozinho)
const autoplayInterval = 5000; // 5 segundos
setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
}, autoplayInterval);


// 6. Navegação com Botões (Se for usar os botões prev/next no HTML)
/*
document.getElementById('nextBtn').addEventListener('click', () => {
    let nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
});
*/


function verificarGridsVazias() {
    const grids = [
        { id: 'grid-venda', nome: 'casas para venda' },
        { id: 'grid-locacao', nome: 'sala comercial para locação' },
        { id: 'grid-rural', nome: 'propriedades rurais' }
    ];

    grids.forEach(gridInfo => {
        const container = document.getElementById(gridInfo.id);
        
        if (container) {
            // .children.length verifica se existem elementos (cards) lá dentro
            // .trim() remove espaços vazios que o HTML costuma deixar
            const temConteudo = container.children.length > 0 || container.innerText.trim() !== "";

            if (!temConteudo) {
                container.innerHTML = `
                    <div class="empty-state">
                        <p>No momento, não temos ${gridInfo.nome} disponíveis.</p>
                    </div>
                `;
                
                // Força a grid a ocupar a largura total para centralizar o aviso
                container.style.display = "block";
                container.style.width = "100%";
                container.style.textAlign = "center";
            }
        }
    });
}

// Isso garante que o código rode MESMO se o script carregar antes do HTML
if (document.readyState === "complete" || document.readyState === "interactive") {
    verificarGridsVazias();
} else {
    document.addEventListener("DOMContentLoaded", verificarGridsVazias);
}
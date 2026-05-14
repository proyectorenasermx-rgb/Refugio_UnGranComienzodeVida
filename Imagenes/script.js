document.addEventListener("DOMContentLoaded", () => {
    console.log("Proyecto cargado correctamente y listo 🎉");
});


/* ================= MENÚ ================= */

document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("menu-toggle");
    const links = document.getElementById("menu-links");
    const dropbtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    // Mostrar menú en móvil
    toggle.addEventListener("click", function () {
        links.classList.toggle("active");
    });

    // Mostrar dropdown en móvil
    dropbtn.addEventListener("click", function () {
        dropdownContent.classList.toggle("show");
    });

});

/* --MENÚ RESPONSIVE-- */

const toggle = document.getElementById("menu-toggle");
const links = document.getElementById("menu-links");

if(toggle && links){

    toggle.addEventListener("click", () => {

        links.classList.toggle("activo");

    });

}




/* ================= Carrusel ================= */

/* ================= COVERFLOW ================= */

document.querySelectorAll(".carrusel").forEach(carrusel => {

    const cards = carrusel.querySelectorAll(".card");
    const next = carrusel.querySelector(".next");
    const prev = carrusel.querySelector(".prev");
    const indicadores =
        carrusel.parentElement.querySelector(".indicadores");

    const track = carrusel.querySelector(".carrusel-track");

    let index = 0;
    let autoplay;


    /* ================= CREAR INDICADORES ================= */

    cards.forEach((_, i) => {

        const dot = document.createElement("span");

        if(i === 0){
            dot.classList.add("activo");
        }

        dot.onclick = () => {

            index = i;

            /* 📱 móvil */
            if(window.innerWidth <= 768){

                const cardWidth =
                    cards[0].offsetWidth + 20;

                track.scrollTo({
                    left: index * cardWidth,
                    behavior: "smooth"
                });

                updateIndicadores();

                return;
            }

            /* 💻 desktop */
            update();
        };

        indicadores.appendChild(dot);

    });


    /* ================= UPDATE INDICADORES ================= */

    function updateIndicadores(){

        indicadores.querySelectorAll("span")
        .forEach((dot, i) => {

            dot.classList.toggle(
                "activo",
                i === index
            );

        });

    }


    /* ================= UPDATE ================= */

    function update() {

        /* 📱 móvil */
        if(window.innerWidth <= 768){

            cards.forEach(card => {

                card.style.transform = "none";
                card.style.opacity = "1";
                card.style.zIndex = "auto";

            });

            updateIndicadores();

            return;
        }

        /* 💻 desktop */
        cards.forEach((card, i) => {

            const offset = i - index;

            const cardWidth = 320;

            card.style.transition =
                "transform 0.8s ease, opacity 0.8s ease";

            card.style.transform = `
                translateX(${offset * cardWidth}px)
                rotateY(${offset * -40}deg)
                scale(${offset === 0 ? 1 : 0.8})
            `;

            card.style.opacity =
                Math.abs(offset) > 2 ? "0" : "1";

            card.style.zIndex =
                cards.length - Math.abs(offset);

        });

        updateIndicadores();
    }


    /* ================= NEXT ================= */

    function nextSlide() {

        /* 📱 móvil */
        if(window.innerWidth <= 768){

            const cardWidth =
                cards[0].offsetWidth + 20;

            index++;

            if(index >= cards.length){
                index = 0;
            }

            track.scrollTo({
                left: index * cardWidth,
                behavior: "smooth"
            });

            updateIndicadores();

            return;
        }

        /* 💻 desktop */
        index = (index + 1) % cards.length;

        update();
    }


    /* ================= PREV ================= */

    function prevSlide() {

        /* 📱 móvil */
        if(window.innerWidth <= 768){

            const cardWidth =
                cards[0].offsetWidth + 20;

            index--;

            if(index < 0){
                index = cards.length - 1;
            }

            track.scrollTo({
                left: index * cardWidth,
                behavior: "smooth"
            });

            updateIndicadores();

            return;
        }

        /* 💻 desktop */
        index =
            (index - 1 + cards.length) % cards.length;

        update();
    }


    /* ================= BOTONES ================= */

    next.onclick = nextSlide;
    prev.onclick = prevSlide;


    /* ================= AUTOPLAY ================= */

    function startAutoplay() {

        autoplay = setInterval(nextSlide, 4000);

    }

    function stopAutoplay() {

        clearInterval(autoplay);

    }

    carrusel.addEventListener(
        "mouseenter",
        stopAutoplay
    );

    carrusel.addEventListener(
        "mouseleave",
        startAutoplay
    );


    /* ================= SCROLL MÓVIL ================= */

    if(window.innerWidth <= 768){

        track.addEventListener("scroll", () => {

            const cardWidth =
                cards[0].offsetWidth + 20;

            const scrollPosition =
                track.scrollLeft;

            const newIndex =
                Math.round(scrollPosition / cardWidth);

            if(newIndex !== index){

                index = newIndex;

                updateIndicadores();

            }

        });

    }


    /* ================= INIT ================= */

    window.addEventListener("resize", update);

    startAutoplay();

    update();

});

/* ================= MODAL ================= */

const cerrar = modal.querySelector(".cerrar");

if(modal){

const modal = document.getElementById("modal");
const titulo = document.getElementById("modal-titulo");
const texto = document.getElementById("modal-texto");


const contenido = modal.querySelector(".modal-content");
document.querySelectorAll(".leer-mas").forEach(btn => {
  btn.onclick = () => {
    titulo.textContent = btn.dataset.titulo;
    texto.textContent = btn.dataset.contenido;
    modal.style.display = "flex";

   requestAnimationFrame(() => {
        contenido.scrollTop = 0;
        modal.scrollTop = 0;
    });      
  };
});

cerrar.onclick = () => modal.style.display = "none";

window.onclick = e => {
  if(e.target === modal) modal.style.display = "none";
};

function updateScrollEnergy(){

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    document.documentElement.style.setProperty(
        '--scroll-progress',
        progress + '%'
    );

    /* 🔥 intensidad del glow según scroll */
    const intensity = 1 + (progress / 100);

    document.documentElement.style.setProperty(
        '--scroll-glow-intensity',
        intensity
    );
}

window.addEventListener("scroll", updateScrollEnergy);
}









// Animación aparición sección interesar
window.addEventListener("scroll", function () {
    const interesar = document.querySelector(".interesar");

    if (interesar) {
        const position = interesar.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            interesar.classList.add("visible");
        }
    }
});



/* ================= Carrusel PDF ================= */
console.log(container);

const pdfs = [
    {
        title: "Catálogo 1",
        file: "../pdfs/catalogo1.pdf",
        thumbnail: "https://placehold.co/400x500?text=PDF+1"
    },

    {
        title: "Catálogo 2",
        file: "../pdfs/catalogo2.pdf",
        thumbnail: "https://placehold.co/400x500?text=PDF+2"
    },

    {
        title: "Catálogo 3",
        file: "../pdfs/catalogo3.pdf",
        thumbnail: "https://placehold.co/400x500?text=PDF+3"
    }
];

const container = document.getElementById("pdfCarousel");

console.log(container);

pdfs.forEach(pdf => {

    const card = document.createElement("div");

    card.classList.add("pdf-card");

    card.innerHTML = `
    
        <img src="${pdf.thumbnail}" alt="${pdf.title}">

        <div class="pdf-content">

            <h2>${pdf.title}</h2>

            <div class="buttons">

                <a href="${pdf.file}" 
                   target="_blank" 
                   class="view-btn">
                   Ver PDF
                </a>

                <a href="${pdf.file}" 
                   download 
                   class="download-btn">
                   Descargar
                </a>

            </div>

        </div>
    `;

    container.appendChild(card);

});
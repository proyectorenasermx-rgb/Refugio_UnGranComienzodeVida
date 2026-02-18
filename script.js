document.addEventListener("DOMContentLoaded", () => {
    console.log("Proyecto cargado correctamente y listo 🎉");
});

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



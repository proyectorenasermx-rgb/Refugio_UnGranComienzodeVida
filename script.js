// MÚSICA
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

audio.volume = 0.4;

btnMusica.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        btnMusica.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        btnMusica.innerHTML = '<i class="fa-solid fa-music"></i>';
    }
});

// FORMULARIO
function mostrarFormulario() {
    document.getElementById("formulario").classList.toggle("oculto");
}

document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        asistencia: document.getElementById("asistencia").value
    };

    fetch("TU_URL_DE_APPS_SCRIPT", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(() => alert("¡Gracias por confirmar! 💕"))
    .catch(() => alert("Error al enviar"));
});

// CUENTA REGRESIVA
const fechaEvento = new Date("July 15, 2025 16:00:00").getTime();

setInterval(() => {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    document.getElementById("dias").textContent =
        Math.floor(diferencia / (1000 * 60 * 60 * 24));
    document.getElementById("horas").textContent =
        Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    document.getElementById("minutos").textContent =
        Math.floor((diferencia / (1000 * 60)) % 60);
    document.getElementById("segundos").textContent =
        Math.floor((diferencia / 1000) % 60);
}, 1000);

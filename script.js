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

// REGALOS
function seleccionarRegalo(el) {
    el.classList.toggle("seleccionado");
}

// FORMULARIO
function mostrarFormulario() {
    document.getElementById("formulario").classList.toggle("oculto");
}

// WHATSAPP AUTO
document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const asistencia = document.getElementById("asistencia").value;

    const mensaje = `¡Hola!\n\nSoy ${nombre}.\nConfirmo asistencia: ${asistencia}.`;

    document.getElementById("btnWhats").href =
        "https://wa.me/525614454159?text=" + encodeURIComponent(mensaje);

    alert("¡Confirmación enviada! 💕");
});

// CUENTA REGRESIVA
const fechaEvento = new Date("2026-07-15T16:00:00").getTime();

setInterval(() => {
    const ahora = new Date().getTime();
    let diff = fechaEvento - ahora;
    if (diff < 0) diff = 0;

    dias.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    horas.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutos.textContent = Math.floor((diff / (1000 * 60)) % 60);
    segundos.textContent = Math.floor((diff / 1000) % 60);
}, 1000);

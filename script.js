function mostrarFormulario() {
    document.getElementById("formulario").classList.toggle("oculto");
}
function reproducirMusica() {
    const audio = document.getElementById("musica");
    audio.play();
}
/* ENVÍO A GOOGLE SHEETS */
document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        nombre: nombre.value,
        telefono: telefono.value,
        asistencia: asistencia.value
    };

    fetch("TU_URL_DE_APPS_SCRIPT", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(() => alert("¡Gracias por confirmar! 💕"))
    .catch(() => alert("Error al enviar"));
});

/* CUENTA REGRESIVA */
const fechaEvento = new Date("July 20, 2025 16:00:00").getTime();

setInterval(() => {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    document.getElementById("dias").innerText = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    document.getElementById("horas").innerText = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    document.getElementById("minutos").innerText = Math.floor((diferencia / (1000 * 60)) % 60);
    document.getElementById("segundos").innerText = Math.floor((diferencia / 1000) % 60);
}, 1000);

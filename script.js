// =====================
// MÚSICA
// =====================
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

btnMusica.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        btnMusica.textContent = "⏸️";
    } else {
        musica.pause();
        btnMusica.textContent = "🎵";
    }
});

// =====================
// FORMULARIO
// =====================
document.getElementById("btnFormulario").onclick = () => {
    document.getElementById("formulario").classList.toggle("oculto");
};

// =====================
// REGALOS
// =====================
let regalosSeleccionados = [];

document.querySelectorAll(".regalos li").forEach(li => {
    li.addEventListener("click", () => {
        li.classList.toggle("seleccionado");
        const regalo = li.textContent;

        if (regalosSeleccionados.includes(regalo)) {
            regalosSeleccionados = regalosSeleccionados.filter(r => r !== regalo);
        } else {
            regalosSeleccionados.push(regalo);
        }
    });
});

// =====================
// ASISTENCIA
// =====================
let asistenciaSeleccionada = "";

document.querySelectorAll(".btn-asistencia").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".btn-asistencia").forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        asistenciaSeleccionada = btn.dataset.valor;
    });
});

// =====================
// ENVÍO GOOGLE SHEETS
// =====================
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyGMrtlVuumCTWYga6rqb96U7erfKx-1j9Pn5-UJr3Ift4KldxBnBZyIwqgNZyLFPw2/exec";

document.getElementById("formulario").addEventListener("submit", e => {
    e.preventDefault();

    fetch(URL_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: nombre.value,
            telefono: telefono.value,
            asistencia: asistenciaSeleccionada,
            regalos: regalosSeleccionados.join(", ")
        })
    })
    .then(() => alert("¡Confirmación enviada! 💖"))
    .catch(() => alert("Ocurrió un error 😥"));
});

// =====================
// CONTADOR FECHA
// =====================
const fechaEvento = new Date("July 15, 2025 16:00:00").getTime();

setInterval(() => {
    const ahora = new Date().getTime();
    const d = fechaEvento - ahora;

    if (d <= 0) return;

    dias.textContent = Math.floor(d / (1000*60*60*24));
    horas.textContent = Math.floor((d / (1000*60*60)) % 24);
    minutos.textContent = Math.floor((d / (1000*60)) % 60);
    segundos.textContent = Math.floor((d / 1000) % 60);
}, 1000);

// =====================
// CONFIRMADOS EN VIVO
// =====================
function cargarConfirmados() {
    fetch(URL_SCRIPT)
        .then(r => r.json())
        .then(d => {
            totalConfirmados.textContent = d.total;
            confirmadosSi.textContent = d.si;
            confirmadosNo.textContent = d.no;
        });
}

cargarConfirmados();
setInterval(cargarConfirmados, 10000);

// =====================
// MÚSICA
// =====================
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

audio.volume = 0.4;

btnMusica.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        btnMusica.innerHTML = "⏸️";
    } else {
        audio.pause();
        btnMusica.innerHTML = "▶️";
    }
});

// =====================
// REGALOS (MÚLTIPLES)
// =====================
function seleccionarRegalo(el) {
    el.classList.toggle("seleccionado");
}

// =====================
// ASISTENCIA
// =====================
function setAsistencia(valor) {
    document.getElementById("asistencia").value = valor;

    document.querySelectorAll(".asistencia button").forEach(btn => {
        btn.classList.remove("activo");
    });

    event.target.classList.add("activo");
}

// =====================
// MOSTRAR FORMULARIO
// =====================
function mostrarFormulario() {
    document.getElementById("formulario").classList.toggle("oculto");
}

// =====================
// ENVÍO A GOOGLE SHEETS
// =====================
document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        asistencia: document.getElementById("asistencia").value,
        regalos: regalosSeleccionados.join(", ")
    };

    fetch("https://script.google.com/macros/s/AKfycbyGMrtlVuumCTWYga6rqb96U7erfKx-1j9Pn5-UJr3Ift4KldxBnBZyIwqgNZyLFPw2/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("¡Confirmación enviada con éxito! 💕");
        document.getElementById("formulario").reset();
    })
    .catch(() => {
        alert("Ocurrió un error, intenta nuevamente 😥");
    });
});
// =====================
// CUENTA REGRESIVA (CORRECTA)
// =====================
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

// =====================
// CONTADOR EN VIVO
// =====================
const URL_SHEET = "https://script.google.com/macros/s/AKfycbyGMrtlVuumCTWYga6rqb96U7erfKx-1j9Pn5-UJr3Ift4KldxBnBZyIwqgNZyLFPw2/exec";

function cargarConfirmados() {
    fetch(URL_SHEET)
        .then(res => res.json())
        .then(data => {
            document.getElementById("totalConfirmados").textContent = data.total;
            document.getElementById("confirmadosSi").textContent = data.si;
            document.getElementById("confirmadosNo").textContent = data.no;
        })
        .catch(() => console.log("Error al cargar confirmados"));
}

// Cargar al iniciar
cargarConfirmados();

// Actualizar cada 10 segundos
setInterval(cargarConfirmados, 10000);


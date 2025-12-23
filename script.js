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
document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const asistencia = document.getElementById("asistencia").value;

    if (!asistencia) {
        alert("Por favor selecciona si asistirás 😊");
        return;
    }

    const regalos = Array.from(document.querySelectorAll(".regalos li.seleccionado"))
        .map(li => li.textContent.trim())
        .join(", ");

    const payload = {
        nombre,
        telefono,
        asistencia,
        regalos
    };

    fetch("https://script.google.com/macros/s/AKfycbyGMrtlVuumCTWYga6rqb96U7erfKx-1j9Pn5-UJr3Ift4KldxBnBZyIwqgNZyLFPw2/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    })
    .then(() => {
        alert("¡Confirmación enviada! 💕");

        const mensaje = `¡Hola!\n\nSoy ${nombre}.\nConfirmo asistencia: ${asistencia}.\nRegalos: ${regalos || "Aún no decidido"}.`;

        window.open(
            "https://wa.me/525614454159?text=" + encodeURIComponent(mensaje),
            "_blank"
        );

        document.getElementById("formulario").reset();
        document.getElementById("formulario").classList.add("oculto");
    })
    .catch(() => {
        alert("Ocurrió un error, intenta nuevamente 😥");
    });
});

// =====================
// CUENTA REGRESIVA (CORRECTA)
// =====================
const fechaEvento = new Date("2025-07-15T16:00:00").getTime();

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


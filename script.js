document.addEventListener("DOMContentLoaded", function () {

    const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyGMrtlVuumCTWYga6rqb96U7erfKx-1j9Pn5-UJr3Ift4KldxBnBZyIwqgNZyLFPw2/exec";

    // =====================
    // BLOQUEAR REGALOS DESDE SHEETS
    // =====================
    fetch(URL_SCRIPT)
        .then(res => res.json())
        .then(regalosOcupados => {
            document.querySelectorAll(".regalos li").forEach(li => {
                if (regalosOcupados.includes(li.textContent.trim())) {
                    li.classList.add("bloqueado");
                }
            });
        })
        .catch(() => console.warn("No se pudieron cargar regalos bloqueados"));

    // =====================
    // BOTÓN MÚSICA
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
    const btnFormulario = document.getElementById("btnFormulario");
    const formulario = document.getElementById("formulario");

    btnFormulario.addEventListener("click", () => {
        formulario.classList.toggle("oculto");
    });

    // =====================
    // REGALOS
    // =====================
    let regalosSeleccionados = [];
    const regalos = document.querySelectorAll(".regalos li");

    regalos.forEach(item => {
        item.addEventListener("click", () => {

            if (item.classList.contains("bloqueado")) return;

            item.classList.toggle("seleccionado");

            const texto = item.textContent.trim();
            if (regalosSeleccionados.includes(texto)) {
                regalosSeleccionados = regalosSeleccionados.filter(r => r !== texto);
            } else {
                regalosSeleccionados.push(texto);
            }
        });
    });

    // =====================
    // ASISTENCIA
    // =====================
    let asistenciaSeleccionada = "";
    const botonesAsistencia = document.querySelectorAll(".btn-asistencia");

    botonesAsistencia.forEach(btn => {
        btn.addEventListener("click", () => {
            botonesAsistencia.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
            asistenciaSeleccionada = btn.dataset.valor;
        });
    });

    // =====================
    // ENVÍO A GOOGLE SHEETS
    // =====================
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!asistenciaSeleccionada) {
            alert("Selecciona Sí o No");
            return;
        }

        fetch(URL_SCRIPT, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: document.getElementById("nombre").value,
                telefono: document.getElementById("telefono").value,
                asistencia: asistenciaSeleccionada,
                regalos: regalosSeleccionados.join(", ")
            })
        })
        .then(() => {
            alert("¡Confirmación enviada! 💕");

            formulario.reset();
            formulario.classList.add("oculto");

            regalosSeleccionados = [];
            asistenciaSeleccionada = "";

            regalos.forEach(r => r.classList.remove("seleccionado"));
            botonesAsistencia.forEach(b => b.classList.remove("activo"));

            btnFormulario.textContent = "Enviar otra asistencia";
        });
    });

    // =====================
    // CUENTA REGRESIVA 2026
    // =====================
    const fechaEvento = new Date("2026-07-15T16:00:00").getTime();

    setInterval(() => {
        const ahora = Date.now();
        const d = fechaEvento - ahora;
        if (d <= 0) return;

        document.getElementById("dias").textContent = Math.floor(d / (1000 * 60 * 60 * 24));
        document.getElementById("horas").textContent = Math.floor((d / (1000 * 60 * 60)) % 24);
        document.getElementById("minutos").textContent = Math.floor((d / (1000 * 60)) % 60);
        document.getElementById("segundos").textContent = Math.floor((d / 1000) % 60);
    }, 1000);

});

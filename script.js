document.addEventListener("DOMContentLoaded", () => {

    // 🎵 MÚSICA
    const musica = document.getElementById("musica");
    const btnMusica = document.getElementById("btnMusica");

    btnMusica.onclick = () => {
        if (musica.paused) {
            musica.play();
            btnMusica.textContent = "⏸️";
        } else {
            musica.pause();
            btnMusica.textContent = "🎵";
        }
    };

    // FORMULARIO
    document.getElementById("btnFormulario").onclick = () => {
        document.getElementById("formulario").classList.toggle("oculto");
    };

    // REGALOS
    let regalosSeleccionados = [];
    document.querySelectorAll(".regalos li").forEach(li => {
        li.onclick = () => {
            li.classList.toggle("seleccionado");
            const r = li.textContent;
            regalosSeleccionados.includes(r)
                ? regalosSeleccionados = regalosSeleccionados.filter(x => x !== r)
                : regalosSeleccionados.push(r);
        };
    });

    // ASISTENCIA
    let asistenciaSeleccionada = "";
    const botones = document.querySelectorAll(".btn-asistencia");

    botones.forEach(btn => {
        btn.onclick = () => {
            botones.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
            asistenciaSeleccionada = btn.dataset.valor;
        };
    });

    // ENVÍO
    document.getElementById("formulario").onsubmit = e => {
        e.preventDefault();

        if (!asistenciaSeleccionada) {
            alert("Selecciona Sí o No");
            return;
        }

        fetch("https://script.google.com/macros/s/AKfycbyGMrtlVuumCTWYga6rqb96U7erfKx-1j9Pn5-UJr3Ift4KldxBnBZyIwqgNZyLFPw2/exec", {
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
        .then(() => alert("¡Confirmación enviada! 💕"));
    };

    // ⏳ CONTADOR 2026
    const fechaEvento = new Date("2026-07-15T16:00:00").getTime();

    setInterval(() => {
        const ahora = Date.now();
        const d = fechaEvento - ahora;
        if (d <= 0) return;

        dias.textContent = Math.floor(d / 86400000);
        horas.textContent = Math.floor(d / 3600000) % 24;
        minutos.textContent = Math.floor(d / 60000) % 60;
        segundos.textContent = Math.floor(d / 1000) % 60;
    }, 1000);
});

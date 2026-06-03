document.addEventListener("DOMContentLoaded", () => {

    function cargarCicadas() {
        fetch('base-completa.json')
            .then(res => res.json())
            .then(data => {

                const contenedor = document.getElementById('lista-cicadas');
                const lista = data.cicadas;

                if (!lista || lista.length === 0) {
                    contenedor.innerHTML = "<p>⚠️ No hay datos en cícadas</p>";
                    return;
                }

                const familias = {};

                lista.forEach(especie => {
                    if (!familias[especie.familia]) {
                        familias[especie.familia] = [];
                    }
                    familias[especie.familia].push(especie);
                });

                Object.keys(familias).sort().forEach(familia => {

                    const seccion = document.createElement('div');
                    seccion.classList.add('familia-seccion');

                    // 🔥 IDs SEGUROS
                    let nombre = familia.toLowerCase().trim();
                    let id = "";

                    if (nombre === "cycadaceae") id = "cyca";
                    else if (nombre === "zamiaceae") id = "zamia";
                    else id = nombre;

                    seccion.id = id;

                    const titulo = document.createElement('h2');
                    titulo.textContent = `Familia: ${familia}`;

                    const grupo = document.createElement('div');
                    grupo.classList.add('especies-grid');

                    familias[familia].forEach(especie => {

                        let icono = especie.distribucion === "México" ? " 🇲🇽" : "";

                        const card = document.createElement('div');
                        card.classList.add('especie');

                        card.innerHTML = `
                            <h3><em>${especie.nombre}</em>${icono}</h3>
                            <p><strong>Género:</strong> ${especie.genero}</p>
                        `;

                        grupo.appendChild(card);
                    });

                    seccion.appendChild(titulo);
                    seccion.appendChild(grupo);
                    contenedor.appendChild(seccion);
                });

                // 🔥 SCROLL DESPUÉS DE CARGAR
                setTimeout(() => {
                    if (window.location.hash) {
                        const el = document.querySelector(window.location.hash);
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                        }
                    }
                }, 100);

            })
            .catch(err => console.error(err));
    }

    // 🚀 ejecutar
    cargarCicadas();

    // 🔝 BOTÓN TOP
    const btn = document.getElementById("btn-top");

    if (btn) {
        let lastScroll = 0;

        window.addEventListener("scroll", () => {
            let currentScroll = window.scrollY;
            btn.style.opacity = currentScroll > lastScroll ? "0.4" : "1";
            lastScroll = currentScroll;
        });

        btn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
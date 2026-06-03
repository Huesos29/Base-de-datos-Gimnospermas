document.addEventListener("DOMContentLoaded", () => {

    function cargarConiferas() {
        fetch('base-completa.json')
            .then(res => res.json())
            .then(data => {

                const contenedor = document.getElementById('lista-coniferas');
                const lista = data.coniferas;

                if (!lista || lista.length === 0) {
                    contenedor.innerHTML = "<p>⚠️ No hay datos en coníferas</p>";
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

                    // 🔥 generar ID dinámico
                    let id = familia.toLowerCase();

                    if (id.includes("araucariaceae")) id = "ara";
                    if (id.includes("cephalotaxaceae")) id = "cepha";
                    if (id.includes("taxaceae")) id = "taxa";
                    if (id.includes("pinaceae")) id = "pina";
                    if (id.includes("podocarpaceae")) id = "podo";
                    if (id.includes("cupressaceae")) id = "cupre";
                    if (id.includes("sciadopityaceae")) id = "sciado";

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
                            <p><strong>Género:</strong> <em>${especie.genero}</em></p>
                        `;

                        grupo.appendChild(card);
                    });

                    seccion.appendChild(titulo);
                    seccion.appendChild(grupo);
                    contenedor.appendChild(seccion);
                });

                // 🔥 asegurar scroll correcto después de cargar
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

    // 🚀 ejecutar carga
    cargarConiferas();

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
function cargarGinkgo() {
    fetch('base-completa.json')
        .then(res => res.json())
        .then(data => {

            const contenedor = document.getElementById('lista-ginkgo');
            const lista = data.ginkgo;

            if (!lista || lista.length === 0) {
                contenedor.innerHTML = "<p>⚠️ No hay datos en ginkgo</p>";
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

                const titulo = document.createElement('h2');
                titulo.textContent = `Familia: ${familia}`;

                // 🔥 IMPORTANTE (NO usar cards/card)
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

        })
        .catch(err => console.error(err));
}

cargarGinkgo();


// 🔝 BOTÓN SCROLL
const btn = document.getElementById("btn-top");

let lastScroll = 0;

window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
        btn.style.opacity = "0.4";
    } else {
        btn.style.opacity = "1";
    }

    lastScroll = currentScroll;
});

btn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
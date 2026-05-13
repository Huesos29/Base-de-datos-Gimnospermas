function cargarGnetales() {
    fetch('base-completa.json')
        .then(res => res.json())
        .then(data => {

            const contenedor = document.getElementById('lista-gnetales');
            const lista = data.gnetales;

            if (!lista || lista.length === 0) {
                contenedor.innerHTML = "<p>⚠️ No hay datos en gnetales</p>";
                return;
            }

            // 🔥 Agrupar por familia
            const familias = {};

            lista.forEach(especie => {
                if (!familias[especie.familia]) {
                    familias[especie.familia] = [];
                }
                familias[especie.familia].push(especie);
            });

            // 🔥 Mostrar por familias
            for (let familia in familias) {

    // 🔥 contenedor de cada familia
    const seccion = document.createElement('div');
    seccion.classList.add('familia-seccion');

    // 🔥 título
    const titulo = document.createElement('h2');
    titulo.textContent = `Familia: ${familia}`;

    // 🔥 contenedor de tarjetas
    const grupo = document.createElement('div');
    grupo.classList.add('cards');

    familias[familia].forEach(especie => {

        let icono = "";
        if (especie.distribucion === "México") {
            icono = " 🇲🇽";
        }

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3><em>${especie.nombre}</em>${icono}</h3>
            <p><strong>Familia:</strong> ${especie.familia}</p>
        `;

        grupo.appendChild(card);
    });

    seccion.appendChild(titulo);
    seccion.appendChild(grupo);

    contenedor.appendChild(seccion);
}

        })
        .catch(err => console.error(err));
}

cargarGnetales();
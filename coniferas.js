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

            // 🔥 Agrupar por familia
            const familias = {};

            lista.forEach(especie => {
                if (!familias[especie.familia]) {
                    familias[especie.familia] = [];
                }
                familias[especie.familia].push(especie);
            });

            // 🔥 Mostrar ordenado
            Object.keys(familias).sort().forEach(familia => {

                const seccion = document.createElement('div');
                seccion.classList.add('familia-seccion');

                const titulo = document.createElement('h2');
                titulo.textContent = `Familia: ${familia}`;

                const grupo = document.createElement('div');
                grupo.classList.add('cards');

                familias[familia].forEach(especie => {

                    let icono = especie.distribucion === "México" ? " 🇲🇽" : "";

                    const card = document.createElement('div');
                    card.classList.add('card');

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

cargarConiferas();
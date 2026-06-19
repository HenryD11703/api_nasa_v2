const apiKey = "dtaHAJckZIVuYvdfww4AF6xc3b6tgNI8flVvoehF";
const baseUrl = "https://api.nasa.gov/EPIC";

fetch(baseUrl + "/api/natural/all?api_key=" + apiKey)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response.json();
    })
    .then(fechas => {
        const fechaReciente = fechas[0].date;
        return fetch(baseUrl + "/api/natural/date/" + fechaReciente + "?api_key=" + apiKey)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error HTTP: " + response.status);
                }
                return response.json();
            })
            .then(imagenes => ({ fechaReciente, imagenes }));
    })
    .then(({ fechaReciente, imagenes }) => {
        const partesFecha = fechaReciente.split("-");
        const anio = partesFecha[0];
        const mes = partesFecha[1];
        const dia = partesFecha[2];

        const contenedor = document.getElementById("galeria");

        imagenes.forEach(item => {
            const urlImagen = baseUrl + "/archive/natural/" + anio + "/" + mes + "/" + dia + "/png/" + item.image + ".png?api_key=" + apiKey;

            const tarjeta = document.createElement("div");
            tarjeta.className = "epic-card";
            tarjeta.innerHTML = `
                <img src="${urlImagen}" alt="${item.caption}">
                <p>${item.date}</p>
            `;

            contenedor.appendChild(tarjeta);
        });
    })
    .catch(error => {
        console.error("Error en la peticion:", error);
        document.getElementById("galeria").textContent = "Error al cargar las imagenes.";
    });

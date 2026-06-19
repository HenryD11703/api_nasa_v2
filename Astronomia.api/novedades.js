const apiKey = "dtaHAJckZIVuYvdfww4AF6xc3b6tgNI8flVvoehF";
const url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        const contenedor = document.getElementById("resultado");

        data.near_earth_objects.forEach(neo => {
            const diametroMin = neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2);
            const diametroMax = neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);
            const peligroso = neo.is_potentially_hazardous_asteroid ? "Si" : "No";

            const ultimaAproximacion = neo.close_approach_data[neo.close_approach_data.length - 1];
            const fecha = ultimaAproximacion ? ultimaAproximacion.close_approach_date : "N/A";
            const cuerpo = ultimaAproximacion ? ultimaAproximacion.orbiting_body : "N/A";
            const distanciaKm = ultimaAproximacion
                ? parseFloat(ultimaAproximacion.miss_distance.kilometers).toLocaleString("es-MX", { maximumFractionDigits: 0 })
                : "N/A";

            const tarjeta = document.createElement("div");
            tarjeta.className = "neo-card";
            tarjeta.innerHTML = `
                <h2>${neo.name}</h2>
                <p><strong>Diametro estimado:</strong> ${diametroMin} - ${diametroMax} km</p>
                <p><strong>Potencialmente peligroso:</strong> ${peligroso}</p>
                <p><strong>Ultima aproximacion:</strong> ${fecha} a ${cuerpo}</p>
                <p><strong>Distancia:</strong> ${distanciaKm} km</p>
                <a href="${neo.nasa_jpl_url}" target="_blank">Ver en NASA JPL</a>
            `;

            contenedor.appendChild(tarjeta);
        });
    })
    .catch(error => {
        console.error("Error en la peticion:", error);
        document.getElementById("resultado").textContent = "Error al cargar los datos.";
    });


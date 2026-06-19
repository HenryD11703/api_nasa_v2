const apiKey = "dtaHAJckZIVuYvdfww4AF6xc3b6tgNI8flVvoehF";

document.getElementById("loadBtn").addEventListener("click", getNASAData);

function getNASAData() {
    fetch("https://api.nasa.gov/planetary/apod?api_key=" + apiKey)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error HTTP: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("image").src = data.url;
            document.getElementById("title").textContent = data.title;
            document.getElementById("description").textContent = data.explanation;
        })
        .catch(error => {
            console.error("Error en la peticion:", error);
        });
}

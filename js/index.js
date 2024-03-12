const INIT_URL ="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150";

async function init() {
    let pokemonContainer = document.getElementById("pokemonContainer");
    let img = document.createElement("img");
    const getList = getData(INIT_URL);
    pokemonContainer.appendChild(img);

    getList.then((result) => {
        console.log('El resultado es:', result.results); // Imprimirá: El resultado es: 42
    }).catch((error) => {
        console.error('Ocurrió un error:', error);
    });
    //img.setAttribute("src",)

}

async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

init().then(r => r);
const INIT_URL ="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150";
const getList = getData(INIT_URL);

async function init() {
    getList.then((result) => {
        localStorage.setItem('pokeList', JSON.stringify(result.results));
        firstPage();
    }).catch((error) => {
        console.error('Ocurrió un error:', error);
    });
    //img.setAttribute("src",)
}

function firstPage(){
    setTimeout(()=>{
        let pokemonContainer = document.getElementById("pokemonContainer");

        let list = JSON.parse(localStorage.getItem("pokeList"));

        list.forEach(pokemon => {
            let img = document.createElement("img");
            console.log("poke: ", pokemon)
            let getPokemon = getData(pokemon.url)

            getPokemon.then((poke) => {
                img.setAttribute("src", poke.sprites.front_default);
            }).catch((error) => {
                console.error('Ocurrió un error:', error);
            });


            pokemonContainer.appendChild(img);
        });
    }, 500)
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

function searchPokemon(){
    let input = document.getElementById("buscarPokemon");
    const url = "https://pokeapi.co/api/v2/pokemon/" + input.value
    console.log(url);
    const getPokemon = getData(url);
    getPokemon.then((result) => {
        localStorage.setItem('pokeList', JSON.stringify(result.results));
        firstPage();
    }).catch((error) => {
        console.error('Ocurrió un error:', error);
    });
};

function renderPokemon(){

}


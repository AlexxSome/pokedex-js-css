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
    let input       = document.getElementById("buscarPokemon");
    const container = document.getElementById("pokemonContainer");
    const url       = "https://pokeapi.co/api/v2/pokemon/" + input.value

    const getPokemon = getData(url);
    getPokemon.then((result) => {
        localStorage.setItem('pokeList', JSON.stringify(result.results));
        console.log(result)
        let img = document.createElement("img");
        let shiny = document.createElement("img");
        let titleName = document.createElement("p");
        let name = document.createElement("p");
        let titleId = document.createElement("p");
        let id = document.createElement("p");
        let containerDetail = document.createElement("div");
        let containerImg = document.createElement("div");
        let rowDetailName = document.createElement("div");
        let rowDetailId = document.createElement("div");

        img.setAttribute("src", result.sprites.front_default);
        shiny.setAttribute("src", result.sprites.back_default);
        name.textContent = result.name.toUpperCase();
        titleName.textContent = "Nombre : ";
        id.textContent = result.id;
        titleId.textContent = "N° Pokedex : ";

        container.classList.add("searchedPokemon");
        containerImg.classList.add("containerImg");
        titleId.classList.add("detailTitlePokemon");
        titleName.classList.add("detailTitlePokemon");
        name.classList.add("detailPokemon");
        id.classList.add("detailPokemon");
        rowDetailName.classList.add("rowDetail");
        rowDetailId.classList.add("rowDetail");

        container.appendChild(containerImg);
        containerImg.appendChild(img);
        containerImg.appendChild(shiny);
        rowDetailName.appendChild(titleName);
        rowDetailName.appendChild(name);
        containerDetail.appendChild(rowDetailName);
        rowDetailId.appendChild(titleId);
        rowDetailId.appendChild(id);
        containerDetail.appendChild(rowDetailId);
        container.appendChild(containerDetail);
    }).catch((error) => {
        console.error('Ocurrió un error:', error);
    });

    clearScreen();
};

function clearScreen(){
    const container = document.getElementById("pokemonContainer");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}


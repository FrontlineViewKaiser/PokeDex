
const pokemons = [
    "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", 
    "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", 
    "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", 
    "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", 
    "nidorina", "nidoqueen", "nidorino", "nidoking", "clefairy", "clefable", 
    "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", 
    "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", 
    "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", 
    "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", 
    "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", 
    "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", 
    "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", 
    "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", 
    "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", 
    "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", 
    "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "scyther", 
    "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", 
    "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", 
    "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", 
    "dragonair", "dragonite"
];

//Gives the original game colors as fixed colorvalues to each type, so that the card color can be adjusted based on the primary type

const PokemoncolorsByType = 
    [{
        normal: '#A8A878', fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068', flying: '#A890F0', psychic: '#A890F0', bug: '#A8B820', rock: '#A8B820', ghost: '#705898', dragon: '#705898', dark: '#705848', steel: '#705848', fairy: '#F0B6BC'
    }
];

//Array to store all fetched (primary) Data
const fetchedPokemonData = [];


let currentlyDisplayedCardIndex = null; //This holds the index of the currently displayed card so that the fullcard design can be changed automatically. Starts at null so no card is displayed upon load
let screenData = {
    internalWidth: ''
};

//Fetches the API data and starts the rendering process upon completion. Begins by grabbing the first 20 pokemon from the list "pokemons"
async function catchThemAll(x, y) {
    for (let i = x; i < `${y}`; i++) {
        const pokemon = pokemons[i]; 
    
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    let response = await fetch(url);
    responseAsJson = await response.json()
    fetchedPokemonData[i] = responseAsJson
    loadMoreButton(x,y)
    displayPokemonCard(fetchedPokemonData[i], i)
    addTypes(fetchedPokemonData[i], i)
    }
}

//renders the pokemon cards on the mainscreen

function displayPokemonCard(PokemonData, i) {
    let PokemonColor = defineColor(i)
    pokedex = document.getElementById('Pokedex')
    pokedex.innerHTML += PokemonCard(PokemonData, i, PokemonColor)
}

// checks the screenwidth every time it changes to find out if a change of layouts of the Full Card is required
function checkScreenWidth() {
    if(window.innerWidth >= 720) {
        screenData.Screenwidth = 'fullscreen';
    } else {
        screenData.Screenwidth = 'mobile';
    }
}

// Watches for a change in screenwidth to a predetermined width to see if the layout of the Full Card needs to be changed
Object.defineProperty(screenData, 'Screenwidth', {
    get() {
        return this.internalWidth;
    },
    set(newVal) {
        if (newVal !== this.internalWidth) { // checks if value is actually changing
            this.internalWidth = newVal;
            onScreenwidthChange();; // calls the function when Screenwidth changes
        }
    }
});

//automatically renders the full pokemon card if the card is already displayed. Checks for the currentlyDisplayedCardIndex to make sure the card is not rendered until you click the required button
function onScreenwidthChange() {
    if (currentlyDisplayedCardIndex !== null) {
        let i = currentlyDisplayedCardIndex
        renderFullDisplay(i)
    } 
}


//renders the FullCard based on the required layout
function renderFullDisplay(i) {
    currentlyDisplayedCardIndex = i;
    if (window.innerWidth >= 720) {
        renderFullscreenCard(i)
    } else {
        renderFullCardMobile(i)
    }
}

//Adds in the types of the Pokemon after the pokemoncard has been rendered
function addTypes(PokemonData, i) {
    typeBox = document.getElementById(`types${i}`);
    let typeData = PokemonData['types'];
    for (let j = 0; j < typeData.length; j++) {
        const type = typeData[j]['type']['name'];
        let typeColor = PokemoncolorsByType[0][`${type}`]
        typeBox.innerHTML += `<div style="background-color:${typeColor}">${type}</div>`
    }
}

async function fetchAbilities(abilityURL) {
    let abilityData = await fetch(`${abilityURL}`)
    abilityDataAsJson = await abilityData.json()
    //Because the english version and the german version are on different positions in some arrays, this if() makes sure the object in question is not in german
    if(abilityDataAsJson['effect_entries'][1]['language']['name'] === 'de') {
        return abilityDataAsJson['effect_entries'][0]['short_effect']    
    } else {
        return abilityDataAsJson['effect_entries'][1]['short_effect']  
    }


}

//checks the primary type of the pokemon and returns the corresponding color
function defineColor(i) {
    PokemonData = fetchedPokemonData[i];
    let ColorDefiningType = PokemonData['types'][0]['type']['name'];
 
    return(PokemoncolorsByType[0][`${ColorDefiningType}`]);
}


function showFullCard() {
    let FullCard = document.getElementById('FullCardDisplay');
    FullCard.style.display = 'flex';
}

function hideFullCard() {
    let FullCard = document.getElementById('FullCardDisplay');
    FullCard.style.display = 'none';

    currentlyDisplayedCardIndex = null;
}

function loadMoreButton(x,y) {
    if(y >= pokemons.length) {
        document.getElementById('loadMore').innerHTML = ''
    } else {
    document.getElementById('loadMore').innerHTML = `
    <Button onclick="catchThemAll(${x+20},${y+20})" class="loadMore">Load More</Button>
    `
    }
}

function search() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let Pokedex = document.getElementById('Pokedex');
    Pokedex.innerHTML = '';
    for (let j = 0; j < fetchedPokemonData.length; j++) {
        const PokemonData = fetchedPokemonData[j];
        if(PokemonData['name'].includes(search)) {
            displayPokemonCard(PokemonData, j)
            addTypes(PokemonData, j)
        };
    }
}

function PokemonCard(PokemonData, i, PokemonColor) {
    return(
    `
    <div onclick="renderFullDisplay(${i})" id="PokeCard" class="PokeCard" style="background-color:${PokemonColor}">
        <div class="number">
            <p class="number">#${PokemonData['id']}</p>
        </div>
        <div id="PokeBildKlein" class="PokeBildKlein">
            <img src="${PokemonData['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
        <div id="NameAndTypes" class="NameAndTypes">
            <h2 class="name">${PokemonData['name']}</h2>
            <div class="types" id="types${i}">
            </div>
        </div>
    </div>
    `
    )
}


//Purely Janitorial function to check functions and API's:

/*async function callstuff() {
    let stuff = await fetch('https://pokeapi.co/api/v2/ability/34/')
    stuffAsJson = await stuff.json()
    console.log(stuffAsJson)
};*/
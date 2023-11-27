function renderFullCardMobile(i) {
    PokemonData = fetchedPokemonData[i]
    showFullCard();
    let BigCard = document.getElementById('PokeCardBig');
    BigCard.innerHTML = '';
    let ColorDefiningType = PokemonData['types'][0]['type']['name'];
    let PokemonColor = PokemoncolorsByType[0][`${ColorDefiningType}`];

    BigCard.style.backgroundColor = `${PokemonColor}`;
    BigCard.innerHTML =  FullcardM(PokemonData, i);
}



function loadCharacteristicsMobile(i) {
    PokemonData = fetchedPokemonData[i]
    let content = document.getElementById('PokecardMainContentM');
    content.innerHTML = '';
    content.style.backgroundColor = 'white';
    content.innerHTML = characteristicsM(PokemonData, i)

    addTypesMobile(PokemonData)
}

function loadBaseStatsMobile(i) {
    PokemonData = fetchedPokemonData[i]
    let content = document.getElementById('PokecardMainContentM');
    content.innerHTML = '';
    content.style.backgroundColor = 'white';
    content.innerHTML = basestatsM(PokemonData, i) 
}



async function loadAbilitiesMobile(i) {
    let PokemonColor = defineColor(i)
    let content = document.getElementById('PokecardMainContentM');
    content.innerHTML = `<button class="returnbuttonM" onclick="renderFullCardMobile(${i})">X</button>`;
    content.style.backgroundColor = 'white';
    PokemonData = fetchedPokemonData[i]
    for (let j = 0; j < PokemonData['abilities'].length; j++) {
        const ability = PokemonData['abilities'][j];
        let abilityURL = ability['ability']['url']
        console.log(await fetchAbilities(abilityURL))
        content.innerHTML += `
        <div style="background-color:${PokemonColor}" class="M-ability">
            <h2>${ability['ability']['name']}</h2>
            <p>${await fetchAbilities(abilityURL)}</p>
        </div>
        `    
    }
}

function addTypesMobile(PokemonData) {
    typeBoxMobile = document.getElementById(`typesM`);
    let typeData = PokemonData['types'];
    for (let j = 0; j < typeData.length; j++) {
        const type = typeData[j]['type']['name'];
        let typeColor = PokemoncolorsByType[0][`${type}`]
        typeBoxMobile.innerHTML += `<div class="M-type" style="background-color:${typeColor}">${type}</div>`
    }
}


//////////////////////////////////////////////////////////////////////////////    HTML DUMP   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////////////////////////////////////    HTML DUMP   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function basestatsM(PokemonData, i) {
    return(
    `
    <button class="returnbuttonM" onclick="renderFullCardMobile(${i})">X</button>
    <div class="M-stats" id="statsM">
        <div>
            <p style="color: rgba(173, 0, 0, 0.589)">HP</p>
            <p>${PokemonData['stats'][0]['base_stat']}</p>
        </div>
        <div>
            <p style="color: rgba(173, 98, 0, 0.589)">ATTACK</p>
            <p>${PokemonData['stats'][1]['base_stat']}</p>
        </div>
        <div>
            <p style="color: rgba(0, 40, 173, 0.589)">DEFENSE</p>
            <p>${PokemonData['stats'][2]['base_stat']}</p>
        </div>
        <div>
            <p style="color: rgba(55, 173, 0, 0.589)">SPECIAL-ATTACK</p>
            <p>${PokemonData['stats'][3]['base_stat']}</p>
        </div>
        <div>
            <p style="color: rgba(144, 0, 173, 0.589)">SPECIAL-DEFENSE</p>
            <p>${PokemonData['stats'][4]['base_stat']}</p>
        </div>
        <div>
            <p style="color: rgba(170, 173, 0, 0.589)">SPEED</p>
            <p>${PokemonData['stats'][5]['base_stat']}</p>
        </div>
    </div>
    `);
}


function FullcardM(PokemonData, i) {
    return( 
    `
    <div class="PokecardHeaderM">
        <button onclick="hideFullCard()">&#8592</button>
        <h2>${PokemonData['name']}</h2>
        <p>#${PokemonData['id']}</p>
    </div>
    <div id="PokecardMainContentM" class="PokecardMainContentM">
        <img src="${PokemonData['sprites']['other']['official-artwork']['front_default']}" alt="">
    </div>
    <div class="PokecardsubmenusM">
        <button onclick="loadCharacteristicsMobile(${i})">Characteristics</button>
        <button onclick="loadBaseStatsMobile(${i})">Base Stats</button>
        <button onclick="loadAbilitiesMobile(${i})">Abilities</button>
    </div>
    `
    );
}

function characteristicsM(PokemonData, i) {
    return(    
    `
    <button class="returnbuttonM" onclick="renderFullCardMobile(${i})">X</button>
    <div class="M-types" id="typesM"></div>
        <div class="appearanceM">
            <div>
            <h2>Height:</h2>
            <p>${(PokemonData['height']*0.1).toFixed(1)}m</p>
        </div>
        <div>
            <h2>Weight:</h2>
            <p>${(PokemonData['weight']*0.1).toFixed(1)}Kg</p>
        </div>
    </div>
    `
)
}
function renderFullscreenCard(i) {
    PokemonData = fetchedPokemonData[i]
    showFullCard();
    let BigCard = document.getElementById('PokeCardBig');
    BigCard.innerHTML = '';
    let ColorDefiningType = PokemonData['types'][0]['type']['name'];
    let PokemonColor = PokemoncolorsByType[0][`${ColorDefiningType}`];

    BigCard.style.backgroundColor = `${PokemonColor}`
    BigCard.innerHTML = fullCardFS(PokemonData, i)
    loadCharacteristics(i)
}

function loadCharacteristics(i) {
    document.getElementById('Characteristics').classList.add('borderBottom');
    document.getElementById('Base Stats').classList.remove('borderBottom');
    document.getElementById('Abilities').classList.remove('borderBottom');
    
    PokemonData = fetchedPokemonData[i]
    let StatSheet = document.getElementById('FS-StatSheet');
    StatSheet.innerHTML = '';
    StatSheet.innerHTML = characteristicsFS(PokemonData, i)
    addTypesBig(PokemonData, i)
}

function addTypesBig(PokemonData, i) {
    typeBoxBig = document.getElementById(`FS-types${i}`);
    let typeData = PokemonData['types'];
    for (let j = 0; j < typeData.length; j++) {
        const type = typeData[j]['type']['name'];
        let typeColor = PokemoncolorsByType[0][`${type}`]
        typeBoxBig.innerHTML += `<div class="FS-type" style="background-color:${typeColor}">${type}</div>`
    }
}

function loadBaseStats(i) {
    document.getElementById('Base Stats').classList.add('borderBottom');
    document.getElementById('Characteristics').classList.remove('borderBottom');
    document.getElementById('Abilities').classList.remove('borderBottom');

    PokemonData = fetchedPokemonData[i]
    let StatSheet = document.getElementById('FS-StatSheet');
    StatSheet.innerHTML = ''
    StatSheet.innerHTML = `
    <div class="Chart">
        <canvas id="myChart"></canvas>
    </div>
    `
    renderChart(PokemonData)
}

async function loadAbilities(i) {
    document.getElementById('Abilities').classList.add('borderBottom');
    document.getElementById('Base Stats').classList.remove('borderBottom');
    document.getElementById('Characteristics').classList.remove('borderBottom');

    let PokemonColor = defineColor(i)
    let StatSheet = document.getElementById('FS-StatSheet');
    StatSheet.innerHTML = '';
    StatSheet.innerHTML = '<div id="abilities" class="abilities">'
    PokemonData = fetchedPokemonData[i]
    for (let j = 0; j < PokemonData['abilities'].length; j++) {
        const ability = PokemonData['abilities'][j];
        let abilityURL = ability['ability']['url']
        console.log(await fetchAbilities(abilityURL))
        document.getElementById('abilities').innerHTML += `
        <div style="background-color:${PokemonColor}" class="ability">
            <h2>${ability['ability']['name']}</h2>
            <p>${await fetchAbilities(abilityURL)}</p>
        </div>
        `    
    }
}

//////////////////////////////////////////////////////////////////////////////    HTML DUMP   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////////////////////////////////////    HTML DUMP   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function fullCardFS(PokemonData, i) {
    return(
    `
    <p class="number">#${PokemonData['id']}</p>
    <h2 class="FS-Name">${PokemonData['name']}</h2>
    <img class="PokeCardBigImageFS" src="${PokemonData['sprites']['other']['official-artwork']['front_default']}" alt="">
    <div class="FS-StatSheet-divisions">                
        <div onclick="loadCharacteristics(${i})" id="Characteristics">Characteristics</div>
        <div onclick="loadBaseStats(${i})" id="Base Stats">Base Stats</div>
        <div onclick="loadAbilities(${i})" id="Abilities">Abilities</div>
    </div>
    <div class="FS-StatSheet" id="FS-StatSheet"></div>
`)
}

function characteristicsFS(PokemonData, i) {
    return(    
    `
    <div class="FS-types" id="FS-types${i}"></div>
        <div class="appearance">
            <div>
            <h2>Height</h2>
            <p>${(PokemonData['height']*0.1).toFixed(1)}m</p>
        </div>
        <div>
            <h2>Weight</h2>
            <p>${(PokemonData['weight']*0.1).toFixed(1)}Kg</p>
        </div>
    </div>
    `)
}
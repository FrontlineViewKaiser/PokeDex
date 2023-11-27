let chart = null;

function renderChart(PokemonData){
const ctx = document.getElementById('myChart');
if (chart instanceof Chart) { //makes sure cards can be reloaded again and again
    chart.destroy();
}

loadInput(PokemonData)

chart =new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Base-Stats',
      data: data,
      backgroundColor: [
        'rgba(173, 0, 0, 0.589)',
        'rgba(173, 98, 0, 0.589)',
        'rgba(0, 40, 173, 0.589)',
        'rgba(55, 173, 0, 0.589)',
        'rgba(144, 0, 173, 0.589)',
        'rgba(170, 173, 0, 0.589)',
      ],
      borderColor: [
        'rgba(173, 0, 0, 0.589)',
        'rgba(173, 98, 0, 0.589)',
        'rgba(0, 40, 173, 0.589)',
        'rgba(55, 173, 0, 0.589)',
        'rgba(144, 0, 173, 0.589)',
        'rgba(170, 173, 0, 0.589)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'x',
    scales: {
      y: {
        beginAtZero: true,
        max: 160,
      }
    }
  }
});
}

//Fills two arrays with the required data from the API to feed the chart
function loadInput(PokemonData) {
    data = [];
    labels = [];
    for (let i = 0; i < PokemonData['stats'].length; i++) {
        const Stat = PokemonData['stats'][i];
        data.push(Stat['base_stat']);
        labels.push(Stat['stat']['name'].toUpperCase());
    }
}
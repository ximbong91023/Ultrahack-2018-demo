document.addEventListener("DOMContentLoaded", function(event) {

  const realData = [
    2123,
    3123,
    2352,
    2636,
    2337,
    3237,
    2329,
    2212,
    3325,
    1112
  ];

  const expectedData = [
    2523,
    3523,
    1535,
    2526,
    2537,
    3537,
    2529,
    2512,
    3525,
    1312
  ];

  const trace1 = {
    x: [
      '19-4-2017',
      '20-4-2017',
      '21-4-2017',
      '22-4-2017',
      '23-4-2017',
      '24-4-2017',
      '25-4-2017',
      '26-4-2017',
      '27-4-2017',
      '28-4-2017'
    ],
    y: realData,
    name: 'Generated',
    type: 'bar'
  };

  const trace2 = {
    x: [
      '19-4-2017',
      '20-4-2017',
      '21-4-2017',
      '22-4-2017',
      '23-4-2017',
      '24-4-2017',
      '25-4-2017',
      '26-4-2017',
      '27-4-2017',
      '28-4-2017'
    ],
    y: expectedData,
    error_y: {
      type: 'data',
      arrayminus: expectedData.map(function(element) {
        return 0.4 * element;
      }),
      visible: true
    },
    name: 'Expectation',
    type: 'scatter'
  }

  const data = [trace1, trace2];

  const layout = {
    title: 'Energy generated from panel A-09 (kWh)'
  };

  Plotly.newPlot('plot', data, layout);

  const outOfRange = (real, expected, error) => {
    return (expected - real) * (expected - real) > error * error
      ? true
      : false;
  }

  const error = (real, expected, error) => {
    return (expected - real) > error
      ? true
      : false;
  }

  //Error calculation
  const calculation = (consumption, prediction) => {
    const newArray = [];
    consumption.y.forEach(function(element, index) {
      if (error(element, prediction.y[index], prediction.error_y.arrayminus[index])) {
        newArray.push(index)
      }
      newArray.forEach(function(element) {
        document.querySelectorAll(".point")[element].children[0].style.fill = "#AF0C0C";
      })
    })
  }

  calculation(trace1, trace2);
  document.addEventListener("keypress", function(event) {
    if (event.keyCode == '13') {
      document.getElementById("plot").remove();
      const newR = '100';
      const newE = '1000';
      trace1.x.shift();
      trace2.x.shift();
      trace1.x.push('29-4-2017');
      trace2.x.push('29-4-2017');
      trace1.y.shift();
      trace2.y.shift();
      trace1.y.push(newR);
      trace2.y.push(newE);
      trace2.error_y.arrayminus.shift();
      trace2.error_y.arrayminus.push(0.2 * newE)
      Plotly.newPlot('test', data, layout);
      calculation(trace1, trace2);
    }
    setTimeout(function() {
      alert("Low energy generated!");
    }, 1000);
  })

});

fetch("https://e2igg6pqd1.execute-api.us-east-1.amazonaws.com/live")
  .then(response => response.json())
  .then(res => filterData(JSON.parse(res.body)))
  .catch(err => console.log(err));



function filterData(data) {
  let categories = [];
  let series = [];
  data.forEach(item => {
    let time = item[0].split(" ")[1];
    let hour =  Number(time.split(":")[0]);
    if(hour>12){
        hour=hour-12
    }
    categories.push(hour);
    series.push(item[1]);
  });
  drawChart(categories, series);
  //   console.log(data);
}

//function expression vs function declaration

function drawChart(categories, series) {
  console.log(categories, series);
  Highcharts.chart("container", {
    chart: {
      type: "column"
    },
    title: {
      text: "Water Usage Per Hour"
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      min: 0,
      title: {
        text: "Water consumption (Liters)",
        
      },
      stackLabels: {
        // enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray"
        }
      }
    },
    legend: {
        enabled:false
   
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
    },
    exporting: { enabled: false },
    plotOptions: {
      column: {
       
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        
        data: series,
        
      }
    ]
  });
}

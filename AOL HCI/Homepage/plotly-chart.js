const lineData = [
    { month: 'Jan', value: 2 },
    { month: 'Feb', value: 3 },
    { month: 'Mar', value: 4 },
    { month: 'Apr', value: 1 },
    { month: 'May', value: 5 },
    { month: 'Jun', value: 4 },
    { month: 'Jul', value: 3 },
    { month: 'Aug', value: 2 },
    { month: 'Sep', value: 4 },
    { month: 'Oct', value: 5 },
    { month: 'Nov', value: 3 },
    { month: 'Dec', value: 3 }
];

const pieData = [
    { category: 'Shopping', value: 45 },
    { category: 'Hotel', value: 15 },
    { category: 'Transport', value: 20 },
    { category: 'Eat', value: 15 }
];

const pieData_2 = [
    { category: 'Satisfied', value: 70 },
    { category: 'Not Satisfied', value: 30 }
];

function plotGraphs() {
    const isMobile = window.innerWidth < 768;

    let layout_1 = {
        showlegend: false,
        width: isMobile ? 450 : 500,
        height: isMobile ? 350 : 400
    };

    let config_1 = {
        responsive: true,
        displayModeBar: false
    };

    let trace1 = {
        x: lineData.map(data => data.month),
        y: lineData.map(data => data.value),
        fill: 'tozeroy',
        type: 'scatter',
        line: {
            color: 'red'
        },
        fillcolor: 'orange'
    };

    Plotly.newPlot('spending-history', [trace1], layout_1, config_1);

    let layout_2 = {
        showlegend: false,
        width: isMobile ? 450 : 500,
        height: isMobile ? 350 : 400,
        font : {size : 20}
    };

    let config_2 = {
        responsive: true,
        displayModeBar: false
    };

    let trace_2 = [{
        type: "pie",
        values: pieData.map(data => data.value),
        labels: pieData.map(data => data.category),
        domain: { column: 0 },
        hole: .4,
        textinfo: "label+percent",
        textposition: "outside",
        insidetextorientation: "radial",
        hoverinfo: "label+percent+name",
        marker: {
            line: {
                color: 'black',
                width: 2
            }
        }
    }];

    Plotly.newPlot('spending-sector', trace_2, layout_2, config_2);

    let trace_3 = [{
        type: "pie",
        values: pieData_2.map(data => data.value),
        labels: pieData_2.map(data => data.category),
        domain: { column: 0 },
        hole: .4,
        textinfo: "label+percent",
        textposition: "outside",
        insidetextorientation: "radial",
        hoverinfo: "label+percent+name",
        marker: {
            line: {
                color: 'black',
                width: 2
            }
        }
    }];

    Plotly.newPlot('trip-satisfaction', trace_3, layout_2, config_2);
}

window.addEventListener('resize', plotGraphs);
plotGraphs();
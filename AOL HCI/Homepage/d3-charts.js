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

const margin = { top: 30, right: 0, bottom: 50, left: 70 };
const width = window.innerWidth < 768 ? window.innerWidth - 50 : 500;
const height = window.innerWidth < 768 ? 200 : 300;

const svgLine = d3.select("#spending-history").append("svg")
    .attr("width", 400 + margin.left + margin.right)
    .attr("height", 400 + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleBand()
    .domain(lineData.map(d => d.month))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(lineData, d => d.value)])
    .nice()
    .range([height, 0]);

svgLine.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svgLine.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

const line = d3.line()
    .x(d => x(d.month))
    .y(d => y(d.value));

svgLine.append("path")
    .datum(lineData)
    .attr("class", "line")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "red")
    .style("stroke-width", "2px");

// Define the area
const area = d3.area()
    .x(d => x(d.month))
    .y0(height)
    .y1(d => y(d.value));

// Add the area
svgLine.append("path")
    .datum(lineData)
    .attr("class", "area")
    .attr("d", area)
    .style("fill", "orange");  // Change the fill color as needed

// Add the line
svgLine.append("path")
    .datum(lineData)
    .attr("class", "line")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "red")
    .style("stroke-width", "2px");



const pieData = [
    { category: 'Shopping', value: 45 },
    { category: 'Hotel', value: 15 },
    { category: 'Transport', value: 20 },
    { category: 'Eat', value: 15 }
];

const margin2 = { top: 30, right: 70, bottom: 50, left: 20 };

const radius = Math.min(width, height) / 2;

const color = d3.scaleOrdinal()
    .domain(pieData.map(d => d.category))
    .range(d3.schemeCategory10);

const svgPie = d3.select("#spending-sector").append("svg")
    .attr("width", width + margin2.left + margin2.right)
    .attr("height", height + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", "translate(" + (width / 2 + margin2.left) + "," + (height / 2 + margin2.top) + ")");

const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

const arc = d3.arc()
    .innerRadius(radius * 0.4)
    .outerRadius(radius * 0.8);

const outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

const arcs = svgPie.selectAll(".arc")
    .data(pie(pieData))
  .enter().append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.category));

svgPie.selectAll("allPolylines")
    .data(pie(pieData))
  .enter().append("polyline")
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr("points", function(d) {
        const posA = arc.centroid(d);
    const posB = outerArc.centroid(d); 
    const posC = outerArc.centroid(d);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
    return [posA, posB, posC];
});

svgPie.selectAll("allLabels")
.data(pie(pieData))
.enter().append("text")
.text(function(d) { return d.data.category + ": " + d.data.value + "%"; })
.attr("transform", function(d) {
    const pos = outerArc.centroid(d);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    pos[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
    return "translate(" + pos + ")";
})
.style("text-anchor", function(d) {
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    return (midangle < Math.PI ? "start" : "end");
});

const satisfactionData = [
    { category: 'Satisfied', value: 70 },
    { category: 'Not Satisfied', value: 30 }
];

const margin3 = { top: 30, right: 70, bottom: 50, left: 40 };

const svgPie2 = d3.select("#trip-satisfaction").append("svg")
    .attr("width", width + margin3.left + margin3.right)
    .attr("height", height + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform", "translate(" + (width / 2 + margin3.left) + "," + (height / 2 + margin3.top) + ")");

const arcs2 = svgPie2.selectAll(".arc")
    .data(pie(satisfactionData))
  .enter().append("g")
    .attr("class", "arc");

arcs2.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.category));

svgPie2.selectAll("allPolylines")
    .data(pie(satisfactionData))
    .enter().append("polyline")
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr("points", function(d) {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d); 
        const posC = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 6;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
        return [posA, posB, posC];
});

svgPie2.selectAll("allLabels")
.data(pie(satisfactionData))
.enter().append("text")
.text(function(d) { return d.data.category + ": " + d.data.value + "%"; })
.attr("transform", function(d) {
    const pos = outerArc.centroid(d);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    pos[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
    return "translate(" + pos + ")";
})
.style("text-anchor", function(d) {
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    return (midangle < Math.PI ? "start" : "end");
});




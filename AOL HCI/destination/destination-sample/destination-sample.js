const lineData = [
    { day: 'Mon', value: 3 },
    { day: 'Tue', value: 2 },
    { day: 'Wed', value: 3 },
    { day: 'Thu', value: 4 },
    { day: 'Fri', value: 5 },
    { day: 'Sat', value: 6 },
    { day: 'Sun', value: 7 }
];

const margin = {top: 10, right: 0, bottom: 30, left: 60};
const width = 400 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

const svgLine = d3.select("#visitors-stat").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleBand()
    .domain(lineData.map(d => d.day))
    .range([0, width])
    .padding(0.1);

var y = d3.scaleLinear()
    .domain([0, d3.max(lineData, function(d) { return d.value; })])
    .range([height, 0]);

svgLine.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svgLine.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

// Define the line function
const line = d3.line()
    .x((d, i) => i === 0 ? 0 : x(d.day) + x.bandwidth() / 2)
    .y(d => y(d.value));

// Define the area function
const area = d3.area()
    .x((d, i) => i === 0 ? 0 : x(d.day) + x.bandwidth() / 2)
    .y0(height)
    .y1(d => y(d.value));

// Add the area
svgLine.append("path")
    .datum(lineData)
    .attr("class", "area")
    .attr("d", area)
    .style("fill", "orange");

// Add the line
svgLine.append("path")
    .datum(lineData)
    .attr("class", "line")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "red")
    .style("stroke-width", "2px");


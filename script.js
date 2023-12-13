//npm install csv-parser fs express ----- read csv files

let combinedData; // Declare the variable to store combined data globally

// Load data and create the initial chart
const fs = require('fs');
const csv = require('csv-parser');

const issuesData = [];
const prsData = [];
const reposData = [];

// Read issues.csv
fs.createReadStream('DATA/issues.csv')
  .pipe(csv())
  .on('data', (row) => {
    issuesData.push(row);
  })
  .on('end', () => {
    // Read prs.csv
    fs.createReadStream('DATA/prs.csv')
      .pipe(csv())
      .on('data', (row) => {
        prsData.push(row);
      })
      .on('end', () => {
        // Read repos.csv
        fs.createReadStream('DATA/repos.csv')
          .pipe(csv())
          .on('data', (row) => {
            reposData.push(row);
          })
          .on('end', () => {
            // Now you can use the data and implement the rest of your logic
            const combinedData = combineData(issuesData, prsData);
            console.log(combinedData); // Example: Log combined data to the console
          });
      });
  });

function combineData(issuesData, prsData) {
    return issuesData.map((issue, i) => {
        return {
            name: issue.name,
            year: issue.year,
            quarter: issue.quarter,
            totalCount: +issue.count + +prsData[i].count,
        };
    });
}


function combineData(issuesData, prsData) {
    return issuesData.map((issue, i) => {
        return {
            name: issue.name,
            year: issue.year,
            quarter: issue.quarter,
            totalCount: +issue.count + +prsData[i].count,
        };
    });
}

function getUniqueValues(data, key) {
    return Array.from(new Set(data.map(d => d[key])));
}

function populateDropdown(id, values) {
    const dropdown = document.getElementById(id);
    values.forEach(value => {
        const option = document.createElement("option");
        option.text = value;
        dropdown.add(option);
    });
}

function updateChart() {
    const selectedYear = document.getElementById("year").value;
    const selectedQuarter = document.getElementById("quarter").value;
    const selectedLanguage = document.getElementById("language").value;
    const selectedVisualizationType = document.getElementById("visualizationType").value;

    const filteredData = getFilteredData(selectedYear, selectedQuarter, selectedLanguage);

    // Remove previous chart
    d3.select("#chart-container").selectAll("*").remove();

    // Create new chart based on the selected visualization type
    if (selectedVisualizationType === "line") {
        createLineChart(filteredData);
    } else if (selectedVisualizationType === "bar") {
        createBarChart(filteredData);
    } else if (selectedVisualizationType === "pie") {
        createPieChart(filteredData);
    }
    // Add more conditions for other visualization types if needed
}

function getFilteredData(year, quarter, language) {
    return combinedData.filter(d => (
        (year === "" || d.year === year) &&
        (quarter === "" || d.quarter === quarter) &&
        (language === "" || d.name === language)
    ));
}
//----------------------------------------------------------------

// Function to combine issues and PRs data
function combineData(issuesData, prsData) {
    return issuesData.map((issue, i) => {
        return {
            name: issue.name,
            year: issue.year,
            quarter: issue.quarter,
            totalCount: +issue.count + +prsData[i].count,
        };
    });
}

// Function to create a line chart
function createLineChart(data) {
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", 400);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    // Set domains for x and y scales based on data
    x.domain(data.map(d => `${d.year} Q${d.quarter}`));
    y.domain([0, d3.max(data, d => d.totalCount)]);

    // Create line function
    const line = d3.line()
        .x(d => x(`${d.year} Q${d.quarter}`))
        .y(d => y(d.totalCount));

    // Append line to the chart
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line);
}

// Function to create a bar chart
function createBarChart(data) {
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", 400);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    // Set domains for x and y scales based on data
    x.domain(data.map(d => `${d.year} Q${d.quarter}`));
    y.domain([0, d3.max(data, d => d.totalCount)]);

    // Append bars to the chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(`${d.year} Q${d.quarter}`))
        .attr("y", d => y(d.totalCount))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.totalCount))
        .attr("fill", "steelblue");
}

// Function to create a pie chart
function createPieChart(data) {
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", 400)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create a pie chart layout
    const pie = d3.pie().value(d => d.totalCount);

    // Create an arc generator
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2);

    // Generate pie chart arcs
    const arcs = pie(data);

    // Append arcs to the chart
    svg.selectAll("path")
        .data(arcs)
        .enter().append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i));
}

//----------------------------------------------------------------

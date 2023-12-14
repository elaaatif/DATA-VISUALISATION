// Load data and create the initial chart
let combinedData;

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

// Function to get unique values from a data array based on a key
function getUniqueValues(data, key) {
    return Array.from(new Set(data.map(d => d[key])));
}

// Function to populate a dropdown with options
function populateDropdown(id, values) {
    const dropdown = document.getElementById(id);
    
    // Clear existing options
    dropdown.innerHTML = "";

    values.forEach(value => {
        const option = document.createElement("option");
        option.text = value;
        dropdown.add(option);
    });
}

// Function to update the chart based on selected filters
function updateChart() {
    const selectedYear = document.getElementById("year").value;
    const selectedQuarter = document.getElementById("quarter").value;
    const selectedLanguage = document.getElementById("language").value;
    const showAllYears = document.getElementById("showAllYears").checked;
    const showAllQuarters = document.getElementById("byQuarter").checked;
    const selectedVisualizationType = document.getElementById("visualizationType").value;

    if (showAllYears || (showAllQuarters && !selectedQuarter)) {
        // If "Show All Years" is checked or "byQuarter" is checked without a selected quarter, ignore the selected year and quarter
        createComparisonChart(selectedLanguage, selectedVisualizationType, showAllQuarters);
    } else {
        const filteredData = getFilteredData(selectedYear, selectedQuarter, selectedLanguage);

        // Remove previous chart
        d3.select("#chart-container").selectAll("*").remove();

        // Create new chart based on the selected visualization type
        if (selectedVisualizationType === "line") {
            createLineChart(filteredData, showAllQuarters);
        } else if (selectedVisualizationType === "bar") {
            createBarChart(filteredData, showAllQuarters);
        }
        // Add more conditions for other visualization types if needed
    }
}


// Function to create a comparison chart for a specific language with all years included
function createComparisonChart(language, visualizationType, showAllQuarters) {
    let filteredData = combinedData.filter(d => d.name === language);

    if (!showAllQuarters) {
        // Filter data for the selected year
        filteredData = filteredData.filter(d => d.year === document.getElementById("year").value);
    }

    // Remove previous chart
    d3.select("#chart-container").selectAll("*").remove();

    // Create new chart based on the selected visualization type
    if (visualizationType === "line") {
        const margin = { top: 20, right: 30, bottom: 50, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#chart-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().range([0, width]).padding(0.1);
        const y = d3.scaleLinear().range([height, 0]);

        // Set domains for x and y scales based on data
        x.domain(filteredData.map(d => `${d.year} Q${d.quarter}`));
        y.domain([0, d3.max(filteredData, d => d.totalCount)]);

        // Add the x-axis with rotated labels
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", "0.5em")
            .attr("dx", "-0.8em")
            .style("text-anchor", "end");

        // Add the y-axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Create line function
        const line = d3.line()
            .x(d => x(`${d.year} Q${d.quarter}`) + x.bandwidth() / 2) // Adjusted x position
            .y(d => y(d.totalCount));

        // Append line to the chart
        svg.append("path")
            .datum(filteredData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr("d", line);
    } else if (visualizationType === "bar") {
        createBarChart(filteredData, showAllQuarters);
    }
    // Add more conditions for other visualization types if needed
}

// Function to create a line chart
function createLineChart(data, showAllQuarters) {
    if (!showAllQuarters) {
        // Filter data for the selected year
        data = data.filter(d => d.year === document.getElementById("year").value);
    }

    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    // Set domains for x and y scales based on data
    x.domain(data.map(d => `${d.year} Q${d.quarter}`));
    y.domain([0, d3.max(data, d => d.totalCount)]);

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Create line function
    const line = d3.line()
        .x(d => x(`${d.year} Q${d.quarter}`) + x.bandwidth() / 2) // Adjusted x position
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
function createBarChart(data, showAllQuarters) {
    if (!showAllQuarters) {
        // Filter data for the selected year
        data = data.filter(d => d.year === document.getElementById("year").value);
    }

    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 420 - margin.top - margin.bottom;

    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    // Set domains for x and y scales based on data
    x.domain(data.map(d => `${d.year} Q${d.quarter}`));
    y.domain([0, d3.max(data, d => d.totalCount)]);

    // Add the x-axis with rotated labels
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "0.5em")
        .attr("dx", "-0.8em")
        .style("text-anchor", "end");

    // Add the y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

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


//-------------------------------------------------------------------------------------------------------------------------------
const color = d3.scaleOrdinal(d3.schemeCategory10);
// Update the createPieChart function
function createPieChart(data) {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create a pie chart layout
    const pie = d3.pie().value(d => d.totalCount);

    // Create an arc generator
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Generate pie chart arcs
    const arcs = pie(data);

    // Append arcs to the chart
    svg.selectAll("path")
        .data(arcs)
        .enter().append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i)) // Use the color scale here

    // Add labels to the pie chart
    svg.selectAll("text")
        .data(arcs)
        .enter().append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => d.data.name);

    // Add legend
    const legend = svg.selectAll(".legend")
        .data(data.map(d => d.name))
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", (d, i) => color(i));

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d);
}


// Function to get filtered data based on selected filters
function getFilteredData(year, quarter, language) {
    return combinedData.filter(d => (
        (year === "" || d.year === year) &&
        (quarter === "" || d.quarter === quarter) &&
        (language === "" || d.name === language)
    ));
}

// Function to load data from CSV files and populate filter options
async function loadData() {
    // Example paths to CSV files, replace with your actual paths
    const issuesData = await d3.csv('DATA/issues.csv');
    const prsData = await d3.csv('DATA/prs.csv'); // Replace with the correct path
    const languagesData = await d3.csv('DATA/repos.csv');

    combinedData = combineData(issuesData, prsData);

    // Get unique values for each category
    const uniqueYears = getUniqueValues(issuesData, 'year');
    const uniqueQuarters = getUniqueValues(issuesData, 'quarter'); // Update with the correct key when available
    const uniqueLanguages = getUniqueValues(languagesData, 'language');

    // Populate the year select element
    populateDropdown('year', uniqueYears);

    // Populate the quarter select element
    populateDropdown('quarter', uniqueQuarters);

    // Populate the language select element
    populateDropdown('language', uniqueLanguages);

    // Initial chart creation
    updateChart();
}

// Event listener for changes in filters
document.getElementById("year").addEventListener("change", updateChart);
document.getElementById("quarter").addEventListener("change", updateChart);
document.getElementById("language").addEventListener("change", updateChart);
document.getElementById("showAllYears").addEventListener("change", updateChart);
document.getElementById("visualizationType").addEventListener("change", updateChart);
document.getElementById("byQuarter").addEventListener("change", updateChart); 


// Call the function to load data and populate filters when the script starts
loadData();

// Call the function to load data and populate filters when the page loads
window.onload = loadData;

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

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.text = "All";
    dropdown.add(defaultOption);

    // Add options based on unique values
    values.forEach(value => {
        const option = document.createElement("option");
        option.text = value;
        dropdown.add(option);
    });
}

// Function to update the chart based on selected filters
function updateChart() {
    // Your existing updateChart function
}

// Function to load data from CSV files and populate filter options
async function loadData() {
    try {
        // Example paths to CSV files, replace with your actual paths
        const issuesData = await d3.csv('./public/assets/DATA/issues.csv');
        const prsData = await d3.csv('./public/assets/DATA/prs.csv');
        const languagesData = await d3.csv('./public/assets/DATA/repos.csv');

        combinedData = combineData(issuesData, prsData);

        // Get unique values for each category
        const uniqueYears = getUniqueValues(issuesData, 'year');
        const uniqueQuarters = getUniqueValues(issuesData, 'quarter');
        const uniqueLanguages = getUniqueValues(languagesData, 'language');

        // Populate the year select element
        populateDropdown('year', uniqueYears);

        // Populate the quarter select element
        populateDropdown('quarter', uniqueQuarters);

        // Populate the language select element
        populateDropdown('language', uniqueLanguages);

        // Initial chart creation
        updateChart();
    } catch (error) {
        console.error('Error loading data:', error);
    }
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

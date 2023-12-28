// VISUALISATION DES GRAPHES

        // Function to load data from CSV files and populate filter options
        async function loadData() {
            // Example paths to CSV files, replace with your actual paths
            const yearsData = await d3.csv('DATA/issues.csv');
            const quartersData = await d3.csv('DATA/issues.csv'); // Replace with 'DATA/quarters.csv' when available
            const languagesData = await d3.csv('DATA/repos.csv');

            // Get unique values for each category
            const uniqueYears = getUniqueValues(yearsData, 'year');
            const uniqueQuarters = getUniqueValues(quartersData, 'quarter'); // Update with the correct key when available
            const uniqueLanguages = getUniqueValues(languagesData, 'language');

            // Populate the year select element
            populateDropdown('year', uniqueYears);

            // Populate the quarter select element
            populateDropdown('quarter', uniqueQuarters);

            // Populate the language select element
            populateDropdown('language', uniqueLanguages);
        }

        // Call the function to load data and populate filters when the page loads
        window.onload = loadData;
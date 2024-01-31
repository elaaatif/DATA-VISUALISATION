import csv

# Specify the path to your CSV file
csv_file_path = 'public/assets/DATA/issues.csv'

csv_file_paths = ['public/assets/DATA/issues.csv', 'public/assets/DATA/prs.csv', 'public/assets/DATA/repos.csv']

# Initialize an empty set to store unique language names
unique_languages = set()

# Read CSV data from each file and extract unique language names
for csv_file_path in csv_file_paths:
    with open(csv_file_path, 'r', newline='') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        
        # Print headers for each file
        print(f"Headers for {csv_file_path}: {csv_reader.fieldnames}")

        for row in csv_reader:
            # Check if the 'name' column exists in the current row
            if 'name' in row:
                unique_languages.add(row['name'])

# Convert set to list for easier use
unique_languages_list = list(unique_languages)

print(unique_languages_list)
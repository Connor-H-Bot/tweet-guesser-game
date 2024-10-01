#!/bin/bash

# Input CSV file and output CSV file
input_file="trump_twitter_reduced.csv"
output_file="output.csv"

# Initialize a counter for the id column
counter=1

# Process the CSV file
awk -v count="$counter" -F',' 'BEGIN { OFS="," }
{
    # Skip the header row
    if (NR == 1) {
        print "id", "text", "isRetweet", "date"
        next
    }

    # Modify the columns
    id = count++
    text = $2
    isRetweet = $3
    # Extract only the year from the date
    year = substr($8, 1, 4)

    # Output the modified line
    print id, text, year
}' "$input_file" > "$output_file"

echo "Processing complete. Output saved to $output_file."

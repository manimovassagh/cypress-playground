package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"regexp"
	"strings"
)

func All_list_maker() {
	// Define the directory to search
	directory := "./cypress/e2e"

	// Run the command to list Cypress test files
	cmd := exec.Command("find", directory, "-name", "*.cy.*")
	out, err := cmd.Output()

	if err != nil {
		fmt.Println("Error listing Cypress test files:", err)
		return
	}

	// Split the output into lines
	filePaths := strings.Split(string(out), "\n")

	// Map to store describe function strings for each file
	fileDescribeMap := make(map[string][]string)

	// Regular expression to extract describe function strings
	re := regexp.MustCompile(`describe\(['"]([^'"]+)['"]`)

	// Process each Cypress test file
	for _, filePath := range filePaths {
		// Skip empty file paths
		if filePath == "" {
			continue
		}

		// Open the Cypress test file
		file, err := os.Open(filePath)
		if err != nil {
			fmt.Println("Error opening Cypress test file:", err)
			return
		}
		defer file.Close()

		// Scan the file line by line
		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			line := scanner.Text()

			// Check if the line contains a describe function call
			matches := re.FindStringSubmatch(line)
			if len(matches) > 1 {
				// Append the describe function string to the map
				fileDescribeMap[filePath] = append(fileDescribeMap[filePath], matches[1])
			}
		}

		if err := scanner.Err(); err != nil {
			fmt.Println("Error scanning Cypress test file:", err)
			return
		}
	}

	// Convert the map to JSON
	jsonData, err := json.MarshalIndent(fileDescribeMap, "", "  ")
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return
	}

	// Save JSON data to a file
	jsonFilePath := "cypress_describe_strings.json"
	jsonFile, err := os.Create(jsonFilePath)
	if err != nil {
		fmt.Println("Error creating JSON file:", err)
		return
	}
	defer jsonFile.Close()

	_, err = jsonFile.Write(jsonData)
	if err != nil {
		fmt.Println("Error writing JSON data to file:", err)
		return
	}

	fmt.Println("Cypress describe function strings saved to:", jsonFilePath)
}

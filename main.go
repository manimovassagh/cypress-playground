package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	// Define the directory to search
	directory := "./cypress/e2e"

	// Run the command to list Cypress test files
	cmd := exec.Command("find", directory, "-name", "*.cy.*")
	out, err := cmd.Output()

	if err != nil {
		fmt.Println("Error listing Cypress test files:", err)
		return
	}

	// Print the list of Cypress test files
	fmt.Println("Cypress test files:")
	fmt.Println(string(out))

	// Save the list to a text file
	filePath := "cypress_test_files.txt"
	file, err := os.Create(filePath)
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	_, err = file.WriteString(string(out))
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return
	}

	fmt.Println("Cypress test files list saved to:", filePath)
}

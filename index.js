const fs = require('fs');
const path = require('path');

function listCypressTests(rootDir) {
  const testFiles = [];
  const describeTexts = {}; // Use an object to store unique describe texts
  const itTexts = {}; // Use an object to store unique it texts

  function walkDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        walkDirectory(filePath);
      } else if (stats.isFile() && file.match(/\.cy\.ts$/)) {
        testFiles.push({ path: filePath, relativePath: path.relative(rootDir, filePath) });

        const testContent = fs.readFileSync(filePath, 'utf-8');

        // Look for describe with any text inside quotes
        const describeMatches = testContent.match(/describe\('([^']+)'/g);
        if (describeMatches) {
          for (const match of describeMatches) {
            // Extract only the text inside quotes, remove leading ', remove first N characters (adjust N as needed)
            const describeText = match.slice(9, -1).slice(N).trim(); // Start after ', remove first N, trim (adjust N)
            describeTexts[describeText] = (describeTexts[describeText] || 0) + 1; // Count unique occurrences
          }
        }

        const itMatches = testContent.match(/it\('(.*?)'/g);
        if (itMatches) {
          for (const match of itMatches) {
            const itText = match.slice(4, -2); // Extract text between 1st and last character (quotes)
            itTexts[itText] = (itTexts[itText] || 0) + 1; // Count unique occurrences
          }
        }
      }
    }
  }

  const N = 1; // Number of characters to remove after the leading quote (adjust as needed)
  walkDirectory(path.join(rootDir, 'cypress', 'e2e'));

  return {
    testFiles,
    describeTexts: Object.entries(describeTexts).map(([text, count]) => ({ text, count })),
    itTexts: Object.entries(itTexts).map(([text, count]) => ({ text, count })),
  };
}

const cypressRootDir = process.cwd(); // Use current directory by default
const testInfo = listCypressTests(cypressRootDir);

console.log('List of all test files (with relative paths):');
console.log(testInfo.testFiles.map(file => file.relativePath));

console.log('\nList of describe function texts (with counts):');
console.table(testInfo.describeTexts);

console.log('\nList of it function texts (with counts):');
console.table(testInfo.itTexts);

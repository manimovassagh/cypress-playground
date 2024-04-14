import * as fs from 'fs';
import * as path from 'path';

interface TestFile {
  path: string;
  relativePath: string;
}

interface TestInfo {
  testFiles: TestFile[];
  describeTexts: { text: string; count: number }[];
  itTexts: { text: string; count: number }[];
}

function listCypressTests(rootDir: string): TestInfo {
  const testFiles: TestFile[] = [];
  const describeTexts: { [key: string]: number } = {};
  const itTexts: { [key: string]: number } = {};

  function walkDirectory(currentDir: string): void {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        walkDirectory(filePath);
      } else if (stats.isFile() && file.match(/\.cy\.ts$/)) {
        testFiles.push({ path: filePath, relativePath: path.relative(rootDir, filePath) });

        const testContent = fs.readFileSync(filePath, 'utf-8');

        const describeMatches = testContent.match(/describe\('([^']+)'/g);
        if (describeMatches) {
          for (const match of describeMatches) {
            const describeText = match.slice(9, -1).trim();
            describeTexts[describeText] = (describeTexts[describeText] || 0) + 1; // Increment count
          }
        }

        const itMatches = testContent.match(/it\('([^']+)'[^]+?(?!(?:\s*cy\.visit\('[^']+'\);)|\s*it\()/gm);
        if (itMatches) {
          for (const match of itMatches) {
            const itText = match.slice(4, -2);
            itTexts[itText] = (itTexts[itText] || 0) + 1; // Increment count
          }
        }
      }
    }
  }

  const N = 1;
  walkDirectory(path.join(rootDir, 'cypress', 'e2e'));

  return {
    testFiles,
    describeTexts: Object.entries(describeTexts).map(([text, count], index) => ({ text, count: index + 1 })),
    itTexts: Object.entries(itTexts).map(([text, count], index) => ({ text, count: index + 1 })),
  };
}

const cypressRootDir = process.cwd(); // Use current directory by default
const testInfo = listCypressTests(cypressRootDir);

console.log('List of SEQT all test files (with relative paths):');
console.log(testInfo.testFiles.map(file => file.relativePath));

console.log('\nList of SEQT describe function texts (with counts):');
console.table(testInfo.describeTexts);

console.log('\nList of SEQT it test cases text (with counts):');
console.table(testInfo.itTexts);

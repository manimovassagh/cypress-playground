"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function listCypressTests(rootDir) {
    var testFiles = [];
    var describeTexts = {};
    var itTexts = {};
    function walkDirectory(currentDir) {
        var files = fs.readdirSync(currentDir);
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var filePath = path.join(currentDir, file);
            var stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                walkDirectory(filePath);
            }
            else if (stats.isFile() && file.match(/\.cy\.ts$/)) {
                testFiles.push({ path: filePath, relativePath: path.relative(rootDir, filePath) });
                var testContent = fs.readFileSync(filePath, 'utf-8');
                var describeMatches = testContent.match(/describe\('([^']+)'/g);
                if (describeMatches) {
                    for (var _a = 0, describeMatches_1 = describeMatches; _a < describeMatches_1.length; _a++) {
                        var match = describeMatches_1[_a];
                        var describeText = match.slice(9, -1).trim();
                        describeTexts[describeText] = (describeTexts[describeText] || 0) + 1; // Increment count
                    }
                }
                var itMatches = testContent.match(/it\('([^']+)'[^]+?(?!(?:\s*cy\.visit\('[^']+'\);)|\s*it\()/gm);
                if (itMatches) {
                    for (var _b = 0, itMatches_1 = itMatches; _b < itMatches_1.length; _b++) {
                        var match = itMatches_1[_b];
                        var itText = match.slice(4, -2);
                        itTexts[itText] = (itTexts[itText] || 0) + 1; // Increment count
                    }
                }
            }
        }
    }
    var N = 1;
    walkDirectory(rootDir); // Changed to rootDir
    return {
        testFiles: testFiles,
        describeTexts: Object.entries(describeTexts).map(function (_a, index) {
            var text = _a[0], count = _a[1];
            return ({ text: text, count: index + 1 });
        }),
        itTexts: Object.entries(itTexts).map(function (_a, index) {
            var text = _a[0], count = _a[1];
            return ({ text: text, count: index + 1 });
        }),
    };
}
var cypressRootDir = path.join(process.cwd(), 'cypress', 'e2e'); // Updated rootDir to point to Cypress tests folder
var testInfo = listCypressTests(cypressRootDir);
console.log('List of SEQT all test files (with relative paths):');
console.log(testInfo.testFiles.map(function (file) { return file.relativePath; }));
console.log('\nList of SEQT describe function texts (with counts):');
console.table(testInfo.describeTexts);
console.log('\nList of SEQT it test cases text (with counts):');
console.table(testInfo.itTexts);

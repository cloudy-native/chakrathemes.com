/**
 * Version Management Script
 *
 * Updates the version number in the application from package.json
 * The version data is stored in src/version.json for use in the application
 */

const fs = require("fs");
const path = require("path");

// Read package.json
const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Get version
const version = packageJson.version;
const versionData = {
  version,
  buildDate: new Date().toISOString(),
};

// Create src directory if it doesn't exist (failsafe)
const srcDir = path.join(__dirname, "..", "src");
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// Write to src/version.json
const outputPath = path.join(srcDir, "version.json");
fs.writeFileSync(outputPath, JSON.stringify(versionData, null, 2));

console.log(`✅ Version updated to ${version} in src/version.json`);

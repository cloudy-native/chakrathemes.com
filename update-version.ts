import fs from 'node:fs/promises';
import packageJson from './package.json';

async function updateVersionFile() {
  const version = packageJson.version;
  const versionData = { version };

  await fs.writeFile('./version.json', JSON.stringify(versionData, null, 2));
  
  console.log(`Version updated to ${version}`);
}

updateVersionFile();

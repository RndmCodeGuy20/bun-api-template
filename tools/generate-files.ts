import fs from 'fs';
import path from 'path';

// Example JSON array of file names
const fileNames = ['./src/helpers/logger.helper.ts'];

// Directory where files will be created
const targetDirectory = './';

// Ensure the target directory exists
if (!fs.existsSync(targetDirectory)) {
  fs.mkdirSync(targetDirectory, { recursive: true });
}

// Create files based on the array
fileNames.forEach((fileName) => {
  const filePath = path.join(targetDirectory, fileName);
  fs.writeFileSync(filePath, '', 'utf8'); // Create an empty file
  console.log(`Created: ${filePath}`);
});

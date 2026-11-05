const fs = require('fs');
const path = require('path');

const targetDir = path.resolve('c:/Users/LENOVO/Desktop/ECHO_AI/stitch_designs');

function processStep(stepNum, filename) {
  const filePath = `C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\77e7e4d9-5792-4085-96af-59c8d96b206c\\.system_generated\\steps\\${stepNum}\\output.txt`;
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    const htmlContent = parsed.html || parsed.content || raw;
    fs.writeFileSync(path.join(targetDir, filename), htmlContent, 'utf8');
    console.log(`Successfully saved ${filename}: ${htmlContent.length} bytes`);
  } catch (err) {
    console.error(`Failed to parse step ${stepNum}:`, err.message);
  }
}

processStep(244, 'screen_1_editorial_platform.html');
processStep(246, 'screen_2_carbon_footprint.html');

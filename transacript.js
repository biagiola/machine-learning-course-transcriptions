const fs = require('fs');

// Get the output file name from the command line arguments
const outputFileName = process.argv[2] || 'clean_transcript.txt';

// Read the transcript file
fs.readFile('transcript.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the file into lines
  const lines = data.split('\n');

  // Initialize an array to hold the clean sentences
  const cleanSentences = [];

  // Iterate over each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip lines that are either numbers or contain timestamps
    if (/^\d+$/.test(line) || /\d{2}:\d{2}:\d{2}/.test(line)) {
      continue;
    }

    // Add the cleaned line to the array
    if (line) {
      cleanSentences.push(line);
    }
  }

  // Join all the cleaned sentences into a single string without break lines
  const cleanTranscript = cleanSentences.join(' ');

  // Write the clean transcript to the specified file
  fs.writeFile(outputFileName, cleanTranscript, (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log(`Clean transcript saved to ${outputFileName}`);
  });
});
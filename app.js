const fs = require('fs');
const yargs = require('yargs');
const { argv } = yargs;

const createFile = (filename) => {
  fs.writeFile(filename, 'You are awesome', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log(`File '${filename}' created successfully.`);
    }
  });
};

const main = () => {
  if (!argv.filename) {
    console.log('Please provide a filename using the --filename flag.');
  } else {
    const filename = argv.filename;
    fs.readFile('filenames.txt', 'utf8', (err, data) => {
      if (err) {
        data = '';
      }
      const filenames = data.split('\n');
      if (filenames.includes(filename)) {
        console.log(`File '${filename}' already exists. Please choose a new filename.`);
      } else {
        filenames.push(filename);
        createFile(filename);
        fs.writeFile('filenames.txt', filenames.join('\n'), (err) => {
          if (err) {
            console.error('Error writing to filenames.txt:', err);
          }
        });
      }
    });
  }
};

main();

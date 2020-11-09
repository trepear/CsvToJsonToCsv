// ***Convert CSV files to JSON, read through JSON object && pull email from them. Then save emails to new CSV file****

const csv = require('csv-parser');
const fs = require('fs');

const results = [];
const specificInfo = [];

// This gives turns example.csv into a JSON obj.
fs.createReadStream('example.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
   // Now, we need to parse through the data to pick out specific information (picking out title in this example)
    var all;
    var film;

    // Push a specific peice of info to a new array (I am using title in this example - can easily be replaced by email or whatever the header is for email)
    for (let i = 0; i < results.length; i++) {
        all = results[i];
        film = all.Film;
        specificInfo.push("title: " + film + "\n");    
    } 
    console.log(specificInfo);

    // Now, for taking all the titles and writing a new CSV file with them:
    fs.writeFile('created-example.csv', specificInfo, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  });
  

const fs = require('fs');

fs.copyFile('.env.example', '.env', (err) => {
  if (err) throw err;
  console.log('copied successfully');
});

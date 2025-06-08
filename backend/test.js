const path = require('path');
const cloudinary = require('cloudinary')


cloudinary.config({  
  cloud_name: 'dbffpmya5', 
  api_key: '349899937571167', 
  api_secret: 'EhTx3Kf_bP0cMtGKepUcZVjHdKA' // Click 'View API Keys' above to copy your API secret
});



cloudinary.uploader.upload('ozy_cosmetic_06_analyzemyface_021.jpg', function(err, result) {
  if (err) return console.error('Error:', err);
  console.log('Result:', result);
});
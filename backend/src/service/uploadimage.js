const cloudinary = require('./cloudinaryconfig');
const path = require('path');
const imagePath = path.resolve(__dirname, 'assets/logo_2.png');

cloudinary.uploader.upload(imagePath, 
  { public_id: "Logo_Glotón" }, 
  function(error, result) {
});

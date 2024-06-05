const fs = require('fs');
const path = require('path');

// Load the JSON data
const json = require('./driverinfo.json');

// Directory where the original images are stored
const imagesDir = path.join(__dirname, 'images');

// Directory where the renamed images will be stored
const outputDir = path.join(__dirname, 'output');

// Function to copy and rename images
const copyAndRenameImages = (driver, carName, image) => {
  const originalImagePath = path.join(imagesDir, image);
  const newImageName = `car_decal_${driver.iracingid}.tga`;
  const carDir = path.join(outputDir, carName);
  const newImagePath = path.join(carDir, newImageName);

  // Ensure the directory exists
  if (!fs.existsSync(carDir)) {
    fs.mkdirSync(carDir, { recursive: true });
  }

  fs.copyFileSync(originalImagePath, newImagePath);
  console.log(`Copied ${originalImagePath} to ${newImagePath}`);
};

// Read the images directory and get all image files
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error(`Error reading images directory: ${err.message}`);
    return;
  }

  // Filter the TGA images
  const tgaImages = files.filter(file => path.extname(file).toLowerCase() === '.tga');

  // Iterate through each driver and process their images
  json.drivers.forEach(driver => {
    tgaImages.forEach(image => {
      const carName = path.basename(image, '.tga');

      // Copy and rename the image for each driver
      copyAndRenameImages(driver, carName, image);
    });
  });

  console.log('All images processed successfully.');
});

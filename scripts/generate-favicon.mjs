import sharp from 'sharp';
import fs from 'fs/promises';

async function generateFavicon() {
  try {
    const svgBuffer = await fs.readFile('public/favicon.svg');
    
    // Generate 32x32 PNG
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile('public/favicon.png');

    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 
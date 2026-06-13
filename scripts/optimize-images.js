const fs = require('fs');
const path = require('path');

// We use dynamic import for sharp so that the script can load even if sharp is being installed
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: "sharp" is not installed. Please run "pnpm add -D sharp" first.');
  process.exit(1);
}

const IMAGES_DIRS = [
  path.join(__dirname, '../public/images/invitation'),
  path.join(__dirname, '../public/images/decorativas_v2')
];

// Supported extensions
const EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stats = fs.statSync(filePath);
  const originalSize = stats.size;

  // Skip if file is already small (e.g., < 10KB)
  if (originalSize < 10240) {
    return;
  }

  const tempFilePath = filePath + '.tmp';

  try {
    let pipeline = sharp(filePath);

    if (ext === '.png') {
      // Compress PNG preserving alpha channel (transparency)
      // quality: 80-85, palette: true forces indexed color palette (similar to pngquant) which reduces size by 70-80%
      pipeline = pipeline.png({
        quality: 80,
        palette: true,
        compressionLevel: 9,
        effort: 10
      });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Compress JPG
      pipeline = pipeline.jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true
      });
    }

    await pipeline.toFile(tempFilePath);

    const tempStats = fs.statSync(tempFilePath);
    const optimizedSize = tempStats.size;

    if (optimizedSize < originalSize) {
      // Replace original file with optimized one
      fs.unlinkSync(filePath);
      fs.renameSync(tempFilePath, filePath);
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      console.log(`✓ Optimized: ${path.relative(process.cwd(), filePath)}`);
      console.log(`  Size: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(optimizedSize / 1024 / 1024).toFixed(2)} MB (-${savings}%)`);
    } else {
      // Optimized is larger, discard it and keep original
      fs.unlinkSync(tempFilePath);
      console.log(`- Skipped (No savings): ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (err) {
    console.error(`✗ Error optimizing ${filePath}:`, err.message);
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}

function walkDirectory(dir, filesList = []) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return filesList;
  }
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDirectory(fullPath, filesList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        filesList.push(fullPath);
      }
    }
  }
  return filesList;
}

async function main() {
  console.log('Starting image optimization...');
  console.log('Scanning directories for PNG/JPG images...');
  
  const allImages = [];
  for (const dir of IMAGES_DIRS) {
    walkDirectory(dir, allImages);
  }

  console.log(`Found ${allImages.length} images to optimize.\n`);

  let totalOriginalSize = 0;
  for (const img of allImages) {
    totalOriginalSize += fs.statSync(img).size;
  }
  console.log(`Total initial images size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB\n`);

  for (let i = 0; i < allImages.length; i++) {
    const filePath = allImages[i];
    console.log(`[${i + 1}/${allImages.length}] Processing...`);
    await optimizeImage(filePath);
  }

  let totalOptimizedSize = 0;
  for (const img of allImages) {
    totalOptimizedSize += fs.statSync(img).size;
  }
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log('\n======================================');
  console.log('Image Optimization Complete!');
  console.log(`Initial Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Final Size:   ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Saved:  ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB (-${totalSavings}%)`);
  console.log('======================================');
}

main().catch(console.error);

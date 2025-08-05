#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { existsSync } from 'fs';

const QUALITY_JPEG = 85;
const QUALITY_WEBP = 80;
const MAX_WIDTH = 1920;
const SIZES = [400, 800, 1200, 1920]; // Responsive sizes

async function getFilesRecursively(dir, extensions = ['.jpg', '.jpeg', '.png']) {
  const files = [];
  const items = await readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getFilesRecursively(fullPath, extensions));
    } else if (extensions.includes(extname(item.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function optimizeImage(inputPath, outputDir) {
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  const stats = await stat(inputPath);
  
  console.log(`\n📸 Processing: ${inputPath}`);
  console.log(`   Original size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
  
  // Create output directory if needed
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }
  
  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  const originalWidth = metadata.width || MAX_WIDTH;
  
  let totalSaved = 0;
  
  // Generate responsive versions
  for (const width of SIZES) {
    if (width > originalWidth) continue;
    
    const suffix = width === MAX_WIDTH ? '' : `-${width}w`;
    
    // Optimize as JPEG/PNG
    const optimizedPath = join(outputDir, `${name}${suffix}${ext}`);
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: QUALITY_JPEG, progressive: true })
      .png({ quality: QUALITY_JPEG, compressionLevel: 9 })
      .toFile(optimizedPath);
    
    // Convert to WebP
    const webpPath = join(outputDir, `${name}${suffix}.webp`);
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY_WEBP })
      .toFile(webpPath);
    
    const webpStats = await stat(webpPath);
    const optimizedStats = await stat(optimizedPath);
    
    const saved = stats.size - Math.min(webpStats.size, optimizedStats.size);
    totalSaved += saved;
    
    console.log(`   ✅ ${width}w: ${(Math.min(webpStats.size, optimizedStats.size) / 1024).toFixed(0)}KB (saved ${(saved / 1024).toFixed(0)}KB)`);
  }
  
  console.log(`   💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
  
  return totalSaved;
}

async function generateImageMap(outputDir) {
  const imageMap = {};
  const files = await getFilesRecursively(outputDir, ['.jpg', '.jpeg', '.png', '.webp']);
  
  for (const file of files) {
    const relativePath = file.replace(outputDir + '/', '');
    const ext = extname(file);
    const name = basename(file, ext);
    const baseNameMatch = name.match(/^(.+?)(-\d+w)?$/);
    
    if (baseNameMatch) {
      const baseName = baseNameMatch[1];
      const key = dirname(relativePath) + '/' + baseName;
      
      if (!imageMap[key]) {
        imageMap[key] = {
          sources: [],
          fallback: ''
        };
      }
      
      if (ext === '.webp') {
        const widthMatch = name.match(/-(\d+)w$/);
        const width = widthMatch ? parseInt(widthMatch[1]) : MAX_WIDTH;
        imageMap[key].sources.push({
          srcset: relativePath,
          type: 'image/webp',
          width
        });
      } else if (!name.includes('-')) {
        imageMap[key].fallback = relativePath;
      }
    }
  }
  
  return imageMap;
}

async function main() {
  const publicDir = './public';
  const imagesDir = join(publicDir, 'images');
  const outputDir = join(publicDir, 'images-optimized');
  
  try {
    // Get all images
    const images = await getFilesRecursively(imagesDir);
    console.log(`Found ${images.length} images to optimize\n`);
    
    let totalOriginalSize = 0;
    let totalSaved = 0;
    
    // Calculate total size
    for (const image of images) {
      const stats = await stat(image);
      totalOriginalSize += stats.size;
    }
    
    console.log(`📊 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB\n`);
    
    // Optimize each image
    for (const image of images) {
      const relativePath = image.replace(imagesDir, '');
      const outputPath = join(outputDir, dirname(relativePath));
      
      const saved = await optimizeImage(image, outputPath);
      totalSaved += saved;
    }
    
    // Generate image map for React components
    const imageMap = await generateImageMap(outputDir);
    await import('fs').then(fs => 
      fs.promises.writeFile(
        join(outputDir, 'image-map.json'),
        JSON.stringify(imageMap, null, 2)
      )
    );
    
    console.log('\n✨ Optimization complete!');
    console.log(`📉 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
    console.log(`📊 Compression ratio: ${((totalSaved / totalOriginalSize) * 100).toFixed(1)}%`);
    console.log('\n📝 Image map generated at: images-optimized/image-map.json');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
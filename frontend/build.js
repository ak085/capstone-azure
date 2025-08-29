import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';

async function buildApp() {
  try {
    // Build JavaScript bundle
    await build({
      entryPoints: ['./src/index.js'],
      bundle: true,
      outdir: './dist',
      loader: { '.js': 'jsx' },
      jsx: 'automatic',
      format: 'esm',
    });

    // Copy HTML file
    const htmlContent = fs.readFileSync('./index.html', 'utf8');
    const fixedHtml = htmlContent.replace('./dist/index.js', './index.js');
    fs.writeFileSync('./dist/index.html', fixedHtml);

    // Copy login.html file
    if (fs.existsSync('./login.html')) {
      fs.copyFileSync('./login.html', './dist/login.html');
    }

    // Copy CSS directory
    if (fs.existsSync('./css')) {
      if (!fs.existsSync('./dist/css')) {
        fs.mkdirSync('./dist/css', { recursive: true });
      }
      fs.cpSync('./css', './dist/css', { recursive: true });
    }

    // Copy images directory
    if (fs.existsSync('./images')) {
      if (!fs.existsSync('./dist/images')) {
        fs.mkdirSync('./dist/images', { recursive: true });
      }
      fs.cpSync('./images', './dist/images', { recursive: true });
    }

    // Copy Azure Static Web Apps configuration
    if (fs.existsSync('./staticwebapp.config.json')) {
      fs.copyFileSync('./staticwebapp.config.json', './dist/staticwebapp.config.json');
    }

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp();

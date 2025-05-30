// Script simples para criar ícones PNG básicos
// Como fallback para quando svg2png-cli não está disponível

const fs = require("node:fs");
const path = require("node:path");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// SVG básico para converter
const baseSVG = `<svg width="SIZE" height="SIZE" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="16" height="16" fill="white" rx="2"/>
  <path d="M1.5 14 V4 H3.8 L6 8 8.2 4 H10.5 L14 14 H11.5 L10.5 11 H7.5 V14 H5.5 V8 L3.8 11 V14 Z M8.5 9 H9.5 L9 7.5 Z" fill="#1f2937" fillRule="evenodd"/>
  <circle cx="6" cy="2" r="1" fill="#dc2626"/>
</svg>`;

const publicDir = path.join(__dirname, "..", "public");

// Criar arquivos SVG temporários para cada tamanho
console.log("📝 Criando arquivos SVG temporários...");

for (const size of sizes) {
  const svgContent = baseSVG.replace("SIZE", size).replace("SIZE", size);
  const svgPath = path.join(publicDir, `icon-${size}.svg`);

  try {
    fs.writeFileSync(svgPath, svgContent);
    console.log(`✅ Created: icon-${size}.svg`);
  } catch (error) {
    console.error(`❌ Failed to create icon-${size}.svg:`, error.message);
    process.exit(1);
  }
}

console.log("\n🎉 Ícones SVG criados com sucesso!");
console.log("\n📋 Para converter para PNG manualmente:");
console.log("1. Visite: https://convertio.co/svg-png/");
console.log("2. Ou use: https://cloudconvert.com/svg-to-png");
console.log("3. Ou instale: npm install -g svg2png-cli");
console.log("\n💡 Comandos para conversão (se tiver svg2png-cli):");

for (const size of sizes) {
  console.log(
    `svg2png public/icon-${size}.svg --output public/icon-${size}.png --width ${size} --height ${size}`
  );
}

console.log(
  "\n📱 Por enquanto, os navegadores usarão os SVGs automaticamente!"
);

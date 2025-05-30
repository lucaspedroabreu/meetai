// Script para gerar ícones PWA em diferentes tamanhos
// Baseado no MeetAI Icon SVG

const fs = require("node:fs");
const path = require("node:path");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const svgTemplate = (
  size
) => `<svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>MeetAI PWA Icon ${size}x${size}</title>
  
  <!-- Fundo branco para melhor contraste -->
  <rect width="16" height="16" fill="white" rx="2"/>
  
  <!-- Logo MA -->
  <path
    d="M1.5 14 V4 H3.8 L6 8 8.2 4 H10.5 L14 14 H11.5 L10.5 11 H7.5 V14 H5.5 V8 L3.8 11 V14 Z M8.5 9 H9.5 L9 7.5 Z"
    fill="#1f2937"
    fillRule="evenodd"
  />
  
  <!-- Ponto do i -->
  <circle
    cx="6"
    cy="2"
    r="1"
    fill="#dc2626"
  />
</svg>`;

// Criar diretório public se não existir
const publicDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Gerar SVGs para cada tamanho
for (const size of sizes) {
  const filename = `icon-${size}.svg`;
  const filepath = path.join(publicDir, filename);

  fs.writeFileSync(filepath, svgTemplate(size));
  console.log(`✅ Gerado: ${filename}`);
}

console.log("\n🎉 Todos os ícones PWA foram gerados!");
console.log("\n📝 Para converter para PNG, use:");
console.log("npm install -g svg2png-cli");
for (const size of sizes) {
  console.log(
    `svg2png public/icon-${size}.svg --output public/icon-${size}.png --width ${size} --height ${size}`
  );
}

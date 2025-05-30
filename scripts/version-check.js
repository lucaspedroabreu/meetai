#!/usr/bin/env node

/**
 * Script para verificar consistência de versões entre arquivos do projeto
 * Execução: node scripts/version-check.js
 */

const fs = require("fs");
const path = require("path");

// Arquivos a serem verificados
const FILES_TO_CHECK = [
  {
    file: "package.json",
    extract: (content) => JSON.parse(content).version,
    description: "Package.json version",
  },
  {
    file: "README.md",
    extract: (content) => {
      const match = content.match(/Version-([^-]+--?[^-]*)-blue/);
      return match ? match[1].replace("--", "-") : null;
    },
    description: "README.md badge version",
  },
  {
    file: "public/sw.js",
    extract: (content) => {
      const versionMatch = content.match(/\/\/ Versão ([^\s]+)/);
      const cacheMatch = content.match(/meetai-v([^"]+)"/);
      return {
        comment: versionMatch ? versionMatch[1] : null,
        cache: cacheMatch ? cacheMatch[1] : null,
      };
    },
    description: "Service Worker versions",
  },
];

function checkVersionConsistency() {
  console.log("🔍 Verificando consistência de versões...\n");

  const results = {};
  let hasInconsistency = false;

  FILES_TO_CHECK.forEach(({ file, extract, description }) => {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${description}: Arquivo não encontrado (${file})`);
      return;
    }

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const version = extract(content);

      results[file] = {
        version,
        description,
      };

      console.log(`📄 ${description}:`);
      if (typeof version === "object") {
        Object.entries(version).forEach(([key, value]) => {
          console.log(`   ${key}: ${value || "N/A"}`);
        });
      } else {
        console.log(`   ${version || "N/A"}`);
      }
      console.log();
    } catch (error) {
      console.log(`❌ Erro ao processar ${file}: ${error.message}\n`);
    }
  });

  // Verificar consistência
  const packageVersion = results["package.json"]?.version;
  const readmeVersion = results["README.md"]?.version;
  const swVersions = results["public/sw.js"]?.version;

  console.log("🎯 Análise de Consistência:\n");

  if (packageVersion && readmeVersion && packageVersion !== readmeVersion) {
    console.log(`❌ Inconsistência detectada:`);
    console.log(`   Package.json: ${packageVersion}`);
    console.log(`   README.md: ${readmeVersion}`);
    hasInconsistency = true;
  }

  if (packageVersion && swVersions) {
    if (swVersions.comment && packageVersion !== swVersions.comment) {
      console.log(`❌ Service Worker comment version inconsistente:`);
      console.log(`   Package.json: ${packageVersion}`);
      console.log(`   SW comment: ${swVersions.comment}`);
      hasInconsistency = true;
    }

    if (swVersions.cache && packageVersion !== swVersions.cache) {
      console.log(`❌ Service Worker cache version inconsistente:`);
      console.log(`   Package.json: ${packageVersion}`);
      console.log(`   SW cache: ${swVersions.cache}`);
      hasInconsistency = true;
    }
  }

  if (!hasInconsistency) {
    console.log("✅ Todas as versões estão consistentes!");
  }

  console.log(
    "\n📝 Nota: Execute este script sempre que atualizar a versão do projeto."
  );

  return !hasInconsistency;
}

// Executar verificação
if (require.main === module) {
  const isConsistent = checkVersionConsistency();
  process.exit(isConsistent ? 0 : 1);
}

module.exports = { checkVersionConsistency };

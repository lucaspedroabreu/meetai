#!/usr/bin/env node

/**
 * Script para incrementar versões automaticamente em todos os arquivos
 * Execução: node scripts/version-bump.js [patch|minor|major|prerelease]
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Funções utilitárias
function readFile(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf-8");
}

function parseVersion(version) {
  const match = version.match(
    /^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z]+)(?:\.(\d+))?)?$/
  );
  if (!match) {
    throw new Error(`Formato de versão inválido: ${version}`);
  }

  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
    prerelease: match[4] || null,
    prereleaseNumber: match[5] ? parseInt(match[5]) : null,
  };
}

function formatVersion(versionObj) {
  let version = `${versionObj.major}.${versionObj.minor}.${versionObj.patch}`;
  if (versionObj.prerelease) {
    version += `-${versionObj.prerelease}`;
    if (versionObj.prereleaseNumber !== null) {
      version += `.${versionObj.prereleaseNumber}`;
    }
  }
  return version;
}

function incrementVersion(currentVersion, type) {
  const parsed = parseVersion(currentVersion);

  switch (type) {
    case "major":
      return formatVersion({
        major: parsed.major + 1,
        minor: 0,
        patch: 0,
        prerelease: null,
        prereleaseNumber: null,
      });

    case "minor":
      return formatVersion({
        major: parsed.major,
        minor: parsed.minor + 1,
        patch: 0,
        prerelease: null,
        prereleaseNumber: null,
      });

    case "patch":
      return formatVersion({
        major: parsed.major,
        minor: parsed.minor,
        patch: parsed.patch + 1,
        prerelease: null,
        prereleaseNumber: null,
      });

    case "prerelease":
      if (parsed.prerelease) {
        // Incrementar número da prerelease existente
        return formatVersion({
          ...parsed,
          prereleaseNumber: (parsed.prereleaseNumber || 0) + 1,
        });
      } else {
        // Adicionar primeira prerelease alpha
        return formatVersion({
          ...parsed,
          patch: parsed.patch + 1,
          prerelease: "alpha",
          prereleaseNumber: 0,
        });
      }

    default:
      throw new Error(
        `Tipo de incremento inválido: ${type}. Use: patch, minor, major, prerelease`
      );
  }
}

function updatePackageJson(newVersion) {
  const packagePath = path.join(process.cwd(), "package.json");
  const packageContent = JSON.parse(readFile(packagePath));

  const oldVersion = packageContent.version;
  packageContent.version = newVersion;

  writeFile(packagePath, JSON.stringify(packageContent, null, 2) + "\n");

  console.log(`📦 package.json: ${oldVersion} → ${newVersion}`);
  return oldVersion;
}

function updateReadme(newVersion) {
  const readmePath = path.join(process.cwd(), "README.md");
  let readmeContent = readFile(readmePath);

  const oldVersionMatch = readmeContent.match(/Version-([^-]+--?[^-]*)-blue/);
  const oldVersion = oldVersionMatch
    ? oldVersionMatch[1].replace("--", "-")
    : "não encontrada";

  // Escapar caracteres especiais para regex
  const escapedVersion = newVersion.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const newBadgeVersion = newVersion.replace(/-/g, "--");

  readmeContent = readmeContent.replace(
    /Version-[^-]+--?[^-]*-blue/,
    `Version-${newBadgeVersion}-blue`
  );

  writeFile(readmePath, readmeContent);

  console.log(`📄 README.md: ${oldVersion} → ${newVersion}`);
}

function updateServiceWorker(newVersion) {
  const swPath = path.join(process.cwd(), "public/sw.js");
  let swContent = readFile(swPath);

  // Atualizar comentário de versão
  const oldVersionMatch = swContent.match(/\/\/ Versão ([^\s]+)/);
  const oldVersion = oldVersionMatch ? oldVersionMatch[1] : "não encontrada";

  swContent = swContent.replace(
    /\/\/ Versão [^\s]+/,
    `// Versão ${newVersion}`
  );

  // Atualizar constantes de cache
  swContent = swContent.replace(
    /const CACHE_NAME = "meetai-v[^"]+"/,
    `const CACHE_NAME = "meetai-v${newVersion}"`
  );

  swContent = swContent.replace(
    /const STATIC_CACHE = "meetai-static-v[^"]+"/,
    `const STATIC_CACHE = "meetai-static-v${newVersion}"`
  );

  swContent = swContent.replace(
    /const DYNAMIC_CACHE = "meetai-dynamic-v[^"]+"/,
    `const DYNAMIC_CACHE = "meetai-dynamic-v${newVersion}"`
  );

  writeFile(swPath, swContent);

  console.log(`⚙️  Service Worker: ${oldVersion} → ${newVersion}`);
}

function createGitTag(version) {
  try {
    execSync(`git add -A`, { stdio: "pipe" });
    execSync(`git commit -m "chore: bump version to ${version}"`, {
      stdio: "pipe",
    });
    execSync(`git tag v${version}`, { stdio: "pipe" });

    console.log(`🏷️  Git tag criada: v${version}`);
    console.log(`📝 Commit criado: "chore: bump version to ${version}"`);
  } catch (error) {
    console.log(`⚠️  Aviso: Erro ao criar tag git: ${error.message}`);
    console.log(`   Você pode criar manualmente: git tag v${version}`);
  }
}

function bumpVersion(type) {
  console.log(`🚀 Iniciando bump de versão: ${type.toUpperCase()}\n`);

  try {
    // Ler versão atual do package.json
    const packagePath = path.join(process.cwd(), "package.json");
    const packageContent = JSON.parse(readFile(packagePath));
    const currentVersion = packageContent.version;

    // Calcular nova versão
    const newVersion = incrementVersion(currentVersion, type);

    console.log(`📊 Versão atual: ${currentVersion}`);
    console.log(`📊 Nova versão: ${newVersion}\n`);

    // Atualizar todos os arquivos
    updatePackageJson(newVersion);
    updateReadme(newVersion);
    updateServiceWorker(newVersion);

    // Criar commit e tag git
    createGitTag(newVersion);

    console.log(`\n✅ Bump de versão concluído com sucesso!`);
    console.log(`\n📋 Próximos passos:`);
    console.log(`   1. Revise as mudanças: git show`);
    console.log(`   2. Push dos commits: git push`);
    console.log(`   3. Push das tags: git push --tags`);

    // Verificar consistência
    console.log(`\n🔍 Verificando consistência...`);
    const { checkVersionConsistency } = require("./version-check.js");
    checkVersionConsistency();
  } catch (error) {
    console.error(`❌ Erro durante bump de versão: ${error.message}`);
    process.exit(1);
  }
}

// Executar script
if (require.main === module) {
  const type = process.argv[2];

  if (!type || !["patch", "minor", "major", "prerelease"].includes(type)) {
    console.log(`
🎯 Uso: node scripts/version-bump.js [tipo]

📋 Tipos disponíveis:
   patch      - Correções de bugs (0.1.0 → 0.1.1)
   minor      - Novas funcionalidades (0.1.0 → 0.2.0)
   major      - Mudanças que quebram compatibilidade (0.1.0 → 1.0.0)
   prerelease - Versões de desenvolvimento (0.1.0 → 0.1.1-alpha.0)

💡 Exemplos:
   npm run version:patch
   npm run version:minor
   npm run version:major
   npm run version:prerelease
`);
    process.exit(1);
  }

  bumpVersion(type);
}

module.exports = { bumpVersion, incrementVersion, parseVersion, formatVersion };

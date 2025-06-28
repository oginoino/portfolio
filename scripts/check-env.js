#!/usr/bin/env node

/**
 * Script para validar variáveis de ambiente obrigatórias
 * Executa antes do build para garantir que todas as variáveis necessárias estão definidas
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Variáveis obrigatórias para o projeto
const REQUIRED_VARS = [
  'VITE_WEB3FORMS_ACCESS_KEY',
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID'
];

// Cores para output no terminal
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    log('❌ Arquivo .env não encontrado!', 'red');
    log('💡 Execute: yarn env:setup', 'yellow');
    log('📝 Depois edite o arquivo .env com seus valores reais', 'yellow');
    return false;
  }
  
  return true;
}

function loadEnvVars() {
  const envPath = path.join(process.cwd(), '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  return envVars;
}

function validateRequiredVars(envVars) {
  const missing = [];
  const empty = [];
  
  REQUIRED_VARS.forEach(varName => {
    if (!(varName in envVars)) {
      missing.push(varName);
    } else if (!envVars[varName] || envVars[varName].trim() === '' || envVars[varName] === 'your_web3forms_access_key_here') {
      empty.push(varName);
    }
  });
  
  return { missing, empty };
}

function main() {
  log('🔍 Validando variáveis de ambiente...', 'blue');
  
  // Verifica se arquivo .env existe
  if (!checkEnvFile()) {
    process.exit(1);
  }
  
  // Carrega variáveis do .env
  const envVars = loadEnvVars();
  
  // Valida variáveis obrigatórias
  const { missing, empty } = validateRequiredVars(envVars);
  
  if (missing.length > 0) {
    log('❌ Variáveis obrigatórias não encontradas:', 'red');
    missing.forEach(varName => {
      log(`   - ${varName}`, 'red');
    });
  }
  
  if (empty.length > 0) {
    log('⚠️  Variáveis obrigatórias estão vazias ou com valor padrão:', 'yellow');
    empty.forEach(varName => {
      log(`   - ${varName}`, 'yellow');
    });
  }
  
  if (missing.length > 0 || empty.length > 0) {
    log('', 'reset');
    log('📋 Para corrigir:', 'blue');
    log('1. Edite o arquivo .env', 'blue');
    log('2. Preencha todas as variáveis obrigatórias', 'blue');
    log('3. Execute novamente o build', 'blue');
    log('', 'reset');
    log('📖 Consulte ENV_SETUP.md para mais detalhes', 'blue');
    process.exit(1);
  }
  
  log('✅ Todas as variáveis de ambiente estão configuradas!', 'green');
  log(`📊 ${REQUIRED_VARS.length} variáveis validadas com sucesso`, 'green');
}

// Executa o script principal
main();

export { checkEnvFile, loadEnvVars, validateRequiredVars };
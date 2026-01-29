#!/usr/bin/env node
// Usage: node validate.mjs <file.huml>
// Validates a HUML file and outputs JSON conversion on success

import { readFileSync } from 'fs';
import { parse } from '@huml-lang/huml';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node validate.mjs <file.huml>');
  process.exit(1);
}

try {
  const content = readFileSync(filePath, 'utf-8');
  const result = parse(content);
  console.log('✓ Valid HUML document\n');
  console.log('JSON output:');
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('✗ Invalid HUML document\n');
  console.error('Error:', error.message);
  process.exit(1);
}

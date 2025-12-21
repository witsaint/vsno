#!/usr/bin/env node

/**
 * Test Report Generator
 * Generates a comprehensive test report with coverage and performance metrics
 */

import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { cwd, exit } from 'node:process'

const colors = {
  green: '\x1B[32m',
  red: '\x1B[31m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  reset: '\x1B[0m',
  bold: '\x1B[1m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function runCommand(command, description) {
  log(`\n${colors.blue}${description}${colors.reset}`)
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' })
    return output
  }
  catch (error) {
    log(`Error: ${error.message}`, 'red')
    return null
  }
}

function generateReport() {
  log(`${colors.bold}${colors.blue}🧪 Test Report Generator${colors.reset}`)
  log('='.repeat(50))

  // Run tests with coverage
  const testOutput = runCommand('pnpm test:coverage', 'Running tests with coverage...')

  if (!testOutput) {
    log('Failed to run tests', 'red')
    exit(1)
  }

  // Run type tests
  runCommand('pnpm test:type', 'Running type tests...')

  // Run performance tests
  runCommand('pnpm test:performance', 'Running performance tests...')

  // Run integration tests
  runCommand('pnpm test:integration', 'Running integration tests...')

  // Run E2E tests
  runCommand('pnpm test:e2e', 'Running E2E tests...')

  // Generate summary
  log(`\n${colors.bold}${colors.green}✅ Test Report Complete${colors.reset}`)
  log('='.repeat(50))

  // Try to read coverage report
  try {
    const coveragePath = join(cwd(), 'coverage', 'lcov-report', 'index.html')
    const coverageExists = require('node:fs').existsSync(coveragePath)

    if (coverageExists) {
      log(`📊 Coverage report available at: ${coveragePath}`, 'green')
    }
  }
  catch (error) {
    log(`Error: ${error.message}`, 'red')
    // Coverage report might not exist
  }

  log(`\n${colors.bold}Available test commands:${colors.reset}`)
  log('  pnpm test:run          - Run all tests')
  log('  pnpm test:watch        - Run tests in watch mode')
  log('  pnpm test:coverage     - Run tests with coverage')
  log('  pnpm test:ui           - Open test UI')
  log('  pnpm test:type         - Run type tests only')
  log('  pnpm test:performance  - Run performance tests only')
  log('  pnpm test:integration  - Run integration tests only')
  log('  pnpm test:e2e          - Run E2E tests only')
}

// Run the report generator
generateReport()

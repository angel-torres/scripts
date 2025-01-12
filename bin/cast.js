#!/usr/bin/env node

'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')

/**
 * Constants
 */

const command = process.argv[2]
const script_path = path.join(__dirname, '..', 'commands', command + '.js')

/**
 * Check command argument exists
 */

if (!command) {
  console.error(`
  Usage
    $ cast <command>
  `)

  console.error('  Commands')
  fs.readdirSync(path.join(__dirname, '..', 'commands'))
    .map(file => path.basename(file, path.extname(file)))
    .forEach(command => console.error(`    ${command}`))

    process.exit(1)
}

/**
 * Check script exists
 */

if (!fs.existsSync(script_path)) {
  console.error(`Missing script: ${script_path}`)
  process.exit(1)
}

/**
 * Require script
 */

const script = require(script_path)

/**
 * Run script
 */

if (script) {
  console.log(`Running script: ${script_path}`)
  script()
} else {
  console.error(`Script is not a function.`)
  process.exit(1)
}

#!/usr/bin/env node
const parseArgv = require('minimist')
const argvObj = parseArgv(process.argv.slice(2))
const error = require('./cmds/error')
const { getWeather } = require('./cmds/today')
// console.log(argvObj)
let cmd = argvObj._[0] || 'help'
if (argvObj.help || argvObj.h) {
    cmd = 'help'
}
if (argvObj.version || argvObj.v) {
    cmd = 'version'
}
switch (cmd) {
    case 'today':
        getWeather(argvObj)
        break
    case 'version':
        require('./cmds/version')(argvObj)
        break
    case 'help':
        require('./cmds/help')(argvObj)
        break
    default:
        error(`${cmd} is not a valid command!`, true)
        break
}

const packageJson = require('../package.json')
module.exports = () => {
    console.log(`v${packageJson.version}`)
}

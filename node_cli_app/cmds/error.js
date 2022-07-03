module.exports = (err, exit) => {
    console.error(err)
    exit && process.exit(1)
}

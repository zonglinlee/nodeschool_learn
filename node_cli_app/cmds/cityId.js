const ExcelJS = require('exceljs')
const workbook = new ExcelJS.Workbook()
const path = require('path')
const fs = require('fs')
const cityIdFilePath = path.resolve(__dirname + '/../cityList.xlsx')
const fileStream = fs.createReadStream(cityIdFilePath)
let cityIdMaps = {}

async function readExcel() {
    fileStream.on('data', (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`)
    })
    fileStream.on('end', () => {
        console.log('There will be no more data.')
    })
    return workbook.xlsx.read(fileStream).then((res) => {
        const { _worksheets } = res
        // console.log(_worksheets.length)
        _worksheets.forEach((item) => {
            if (item && item.name === 'Sheet1') {
                item.eachRow(function (row) {
                    // eslint-disable-next-line no-unused-vars
                    const [first, second, third, fourth] = row.values
                    cityIdMaps[fourth] = second
                })
            }
        })
        return cityIdMaps
    })
}

module.exports = { readExcel }

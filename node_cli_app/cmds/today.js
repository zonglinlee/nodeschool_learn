const axios = require('axios')
const ora = require('ora')
const error = require('./error')
const fs = require('fs')
const { readExcel } = require('./cityId')
const path = require('path')
const jsonPath = path.resolve(__dirname + '/../cityId.json')
const jsonExist = fs.existsSync(jsonPath)
let cityIdMaps = null
if (jsonExist) {
    cityIdMaps = require(jsonPath)
} else {
    readExcel().then(async (res) => {
        cityIdMaps = res
        // console.log(cityIdMaps)
        fs.writeFile(jsonPath, JSON.stringify(res), function (err) {
            if (err) {
                console.error(err, `json文件写入失败`)
            }
        })
        await getWeather()
    })
}
async function getWeather(args) {
    const location = args.location || args.l
    console.log(location)
    // console.log(Object.keys(cityIdMaps))
    let locationMatch = Object.keys(cityIdMaps).find((item) =>
        item.toLowerCase().includes(location.toLowerCase())
    )
    if (!locationMatch) {
        error(`'${location}'输入有误，查询不到`)
    } else {
        let cityId = cityIdMaps[locationMatch]
        const spinner = ora().start('getting online weather...')
        try {
            const response = await axios({
                method: 'post',
                url: 'http://freecityid.market.alicloudapi.com/whapi/json/alicityweather/briefforecast3days',
                params: {
                    cityId,
                },
                headers: {
                    Authorization: 'APPCODE a7d913f0257c4ccf95e5db0484af42ce',
                },
            })
            spinner.stop()
            if (response.data.code === 0) {
                const { city, forecast } = response.data.data
                console.log(`${city.pname}-${city.name}:`)
                forecast.forEach((item) => {
                    console.log(
                        `${item.predictDate}:${item.conditionDay} | ${item.tempDay}摄氏度 | ${item.windDirDay}`
                    )
                })
            }
        } catch (e) {
            console.error(e)
            error(e, true)
        }
    }
}
module.exports = {
    getWeather,
}

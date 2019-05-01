const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //https://api.darksky.net/forecast/e843be041ae4b682f16a3b3afc39a1f7/5.96944,52.21?units=si
    const url= 'https://api.darksky.net/forecast/e843be041ae4b682f16a3b3afc39a1f7/' + longitude + ',' + latitude + '?units=si'

    request({url, json: true}, (error, { body }) => {

        if (error) {

            callback('Error: Unable to connect to weather service.', undefined)

        } else if (body.error) {

            callback('Error: Unable to find location.', undefined)

        } else {

            const { temperature, precipProbability } = body.currently
            const { summary, temperatureHigh, temperatureLow } = body.daily.data[0]
            const foreCastSentence = `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% change of rain. 
                                     Today's high- and low temperature are: ${temperatureHigh} and ${temperatureLow}.` 
            callback(undefined, (foreCastSentence))
        }
    })
}




module.exports = forecast

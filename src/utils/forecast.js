const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url= 'https://api.darksky.net/forecast/e843be041ae4b682f16a3b3afc39a1f7/' + longitude + ',' + latitude

    request({url, json: true}, (error, { body }) => {

        if (error) {

            callback('Error: Unable to connect to weather service.', undefined)

        } else if (body.error) {

            callback('Error: Unable to find location.', undefined)

        } else {

            const { temperature, precipProbability } = body.currently
            const dailySummary                       = body.daily.data[0].summary
            callback(undefined, (`${dailySummary} It is currently ${temperature} degrees out. There is a ${precipProbability}% change of rain.`))
        }
    })
}




module.exports = forecast

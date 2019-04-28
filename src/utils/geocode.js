const request = require('request')


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2llYnJhc3NlIiwiYSI6ImNqdXY1a2tsYzBsaWU0YW40ZmNmMHh0dWIifQ.Pza9DqUmjjM3SuwFbVhTZQ'

    request({url, json: true}, (error, { body }) => {

        if (error) {

            callback('Error: unable to connect to location services!', undefined)

        } else if (body.features === undefined || body.features.length === 0)  {

            callback('Error: unable to find location, try another search!', undefined)            

        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })

}
         
module.exports = geocode

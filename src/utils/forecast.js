const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/4142cd3068d160ee4d5b8c56d98efde0/' + latitude + ',' + longitude + '?units=si'

    request( { url: url, json: true}, (error, response) => {
        if(error) {
            console.log('Unable to connect to weather service!')
        } else if(response.body.error) {
            console.log('Unable to find location')
        } else {
            const data = {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                rain: response.body.currently.precipProbability
            }
            callback(undefined, data)
        }
    })

}

module.exports = forecast
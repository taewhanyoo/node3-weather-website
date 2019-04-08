const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGFld2hhbiIsImEiOiJjanRtdng0OTAwNDhrNDlxcHJjaGIyYjIyIn0.ZTiRjMAA_y8WlfAYvEbc4w'

    request( { url: url, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode
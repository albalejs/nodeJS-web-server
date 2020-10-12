const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWF2bmVnaWwiLCJhIjoiY2tmdGk5Z2xuMWxmNzJxcGE0bDg3ZnJ3ZyJ9.NX_GKLuz1Drxe5b82LCiJQ`
    request({url, json:true }, (error, {body}) => {
        if (error){
            callback("Unable to connect to location service!")
        } else if (body.features === undefined || body.features.length === 0) {
            callback("Unable to find location")
        } else {
            callback(undefined, {
                location : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode
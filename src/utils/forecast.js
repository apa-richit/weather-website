const request = require('request')


const forecast = (latitude, longitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ad860ec03a42a0a9f95a4a2006010b33&query=' + latitude + ',' + longitude
    
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to forecast services!')
        }
        else if (body.error){
            callback('Unable to find location. Try different search!')
        }
        else{
            callback(undefined, {weather_description: body.current.weather_descriptions[0], current_temperature: body.current.temperature, rain_chance: body.current.precip, humidity: body.current.humidity, locationName: body.location.name, locationCountry: body.location.country, locationRegion: body.location.region})
        }
    })
}

/*forecast(34.0544, -118.2439, (error, data) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log(data)
    }
})*/

module.exports = forecast
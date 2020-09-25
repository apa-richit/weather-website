const request = require('request')
//const chalk = require('chalk')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnM3MzYyNTEiLCJhIjoiY2tmZHZrNXJxMDE3NDJ6bGlrdmwwYmRzNyJ9.T5rQGQHizvLgSIuBk1I_ZA&limit=1&language=en'

    //using es-6 object and property destructuring

    /*request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services')
        }
        else if (response.body.features.length === 0){
            callback('Unable to find location. Try different search!')
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place_name: response.body.features[0].place_name_en
            })
        }
    })*/

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services')
        }
        else if (body.features.length === 0){
            callback('Unable to find location. Try different search!')
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name_en
            })
        }
    })
}

/*geocode('New York', (error,data) => {
    if (error){
        console.log(chalk.red(error))
    }
    else {
        console.log(data)
    }
})*/


/*const forecast = (latitude, longitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ad860ec03a42a0a9f95a4a2006010b33&query=' + latitude + ',' + longitude
    
    request({url: url, json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to forecast services!')
        }
        else if (response.body.error){
            callback('Unable to find location. Try different search!')
        }
        else{
            callback(undefined, {weather_description: response.body.current.weather_descriptions[0], current_temperature: response.body.current.temperature, feelslike: response.body.current.feelslike})
        }
    })
}

forecast(34.0544, -118.2439, (error, data) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log(data)
    }
})*/

module.exports = geocode
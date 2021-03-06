const path = require('path')
const hbs = require('hbs')
const express = require('express')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//console.log(publicDirectoryPath)
//console.log(__dirname)
//console.log(__filename)

//setting for templating engine

app.set('view engine', 'hbs')

app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000

//these are routes


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Ritesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ritesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help page',
        name:'Andrew'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {weather_description, current_temperature, rain_chance, humidity}) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                location: place_name,
                forecast: weather_description + '. It is currently ' + current_temperature + ' degrees out. There is ' + rain_chance + '% chance of rain. There is ' + humidity + '% humidity.',
                address: req.query.address
            })
        })
    })
})

app.get('/weatherByGPS', (req, res) => {
    if(!req.query.lat || !req.query.long){
        return res.send({
            error: 'You must provide a valid lattitude and longitude!'
        })
    }
    forecast(req.query.lat, req.query.long, (error, {weather_description, current_temperature, rain_chance, humidity, locationName, locationCountry, locationRegion}) =>{
        if(error){
            return res.send({error})
        }
        res.send({
            location: locationName + ',' + locationRegion + ',' + locationCountry,
            forecast: weather_description + '. It is currently ' + current_temperature + ' degrees out. There is ' + rain_chance + '% chance of rain. There is ' + humidity + '% humidity.',
            address: locationName + ',' + locationRegion + ',' + locationCountry
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    //console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ritesh',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ritesh',
        errorMessage: 'Page not found.'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen((port), () => {
    console.log(chalk.blue.inverse('server is up and running on port ' + port))
})

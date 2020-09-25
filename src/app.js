const path = require('path')
const hbs = require('hbs')
const express = require('express')
//const chalk = require('chalk')
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
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'
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
        forecast(latitude, longitude, (error, {weather_description, current_temperature, rain_chance}) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                location: place_name,
                forecast: weather_description + '. It is currently ' + current_temperature + ' degrees out. There is ' + rain_chance + '% chance of rain.',
                address: req.query.address
            })
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
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen((port), () => {
    console.log('server is up and running on port ' + port)
})

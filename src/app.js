const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))



app.get('/', (req,res) => {
    res.render('index',{
        title: 'Home',
        name: 'Gil'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Gil'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Gil',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

    
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Gil',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Gil',
        errorMessage:'Error 404 - Page not found'
    })
})

app.listen(3000,() => {
    console.log('Server started on port 3000')
})
const path     = require('path')
const express  = require('express')
const hbs      = require('hbs')
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Seup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Edwin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Edwin'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is an example help message.',
        name: 'Edwin'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: "You must provide an address" 
        })
    }

    geocode(address, (error, { longitude, latitude, location } = {}) => {

        if (error) { return res.send ({ error }) }
    
        forecast(longitude, latitude, (error, forecastData) => {
          
            if (error) { return res.send({ error }) }

            res.send ({
                forecast: forecastData,
                location,
                address
            })
        })   
    })
}) 

app.get('./products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provice a search term"
        })
    }

    res.send({
        products: []
    })
} )

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: "404 Help",
        text404: "Article not found",
        name: 'Edwin'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: "404 page",
        text404: "Page not found",
        name: 'Edwin'
    })
})

app.listen(port, () =>{
    console.log(`server is up on port ${port}`)
})
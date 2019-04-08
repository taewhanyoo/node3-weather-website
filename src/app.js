const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Taewhan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Taewhan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Taewhan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location})=> {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData)=> {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData.summary,
                temperature: forecastData.temperature,
                rain: forecastData.rain,
                location,
                address: req.query.address
            })
        })
    }) 
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Taewhan',
        errorMessage: 'Page is not found'
    })
})

// app.get('', (req, res)=> {
//     res.send('Hello express!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('This is weather page.')
// })

// app.get('', (req, res) => {
//     res.send('<h1>Hello!</h1>')
// })

// app.get('/about', (req, res)  => {
//     res.send([{
//         name: 'Taewhan',
//         age: 61
//     },
//     {
//         name: 'Younghee',
//         age: 60   
//     }])
// })



app.listen(port, () => {
    console.log('Server is up port ' + port)
})
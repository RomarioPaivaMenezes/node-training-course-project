const express = require('express')
const exphbs = require('express-handlebars')


const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.get('/', (req, resp) => {
   // resp.render('home', {layout: false}) when laytou is not defined
   resp.render('home', {layout: false})
})

app.listen(3000, () => {
    console.log('App running...')
})
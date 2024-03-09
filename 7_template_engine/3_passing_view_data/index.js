const express = require('express')
const exphbs = require('express-handlebars')


const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.get('/', (req, resp) => {
   const user = {name: 'Romário', surname:'Paiva Menezes'}
   resp.render('home', {user: user})
})

app.listen(3000, () => {
    console.log('App running...')
})
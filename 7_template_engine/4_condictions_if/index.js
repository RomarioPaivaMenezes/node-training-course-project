const express = require('express')
const exphbs = require('../5_condictions_else/node_modules/express-handlebars/dist')


const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.get('/dashboard', (req, resp) =>{
    resp.render('dashboard')
})
app.get('/', (req, resp) => {
   const user = {name: 'Romário', surname:'Paiva Menezes'}
   const auth = true
   resp.render('home', {user: user, auth})
})

app.listen(3000, () => {
    console.log('App running...')
})
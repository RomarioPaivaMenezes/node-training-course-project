const express = require('express')
const exphbs = require('express-handlebars')


const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.get('/dashboard', (req, resp) =>{
    const items = ['Item a', 'Item b', 'Item c']
    
    resp.render('dashboard', {items})
})

app.get('/post', (req, resp) => {

    const post = {
        title: 'Learning Node Js',
        category: 'JavaScript',
        body: 'This article helpers you to learn NodeJS ...',
        comments: 4
    }

    resp.render('blogpost', {post})
})

app.get('/', (req, resp) => {
    const user = {name: 'Romário', surname:'Paiva Menezes'}
    const auth = true
    const aproved = false
    resp.render('home', {user: user, auth, aproved})
})  

app.listen(3000, () => {
    console.log('App running...')
})
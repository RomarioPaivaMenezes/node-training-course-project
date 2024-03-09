const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const pool = require('./db/conn')

//TODO: verify what's it means (I forgot)
app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (request, response) => {
    response.render('home')
})

// INSERT DATA
app.post('/movies/insertmovie', (request, response) => {


    const title = request.body.title
    const genre = request.body.genre
    const director = request.body.director
    const release_year = request.body.releasedt

    const query = `insert into movie(??, ??, ??, ??) value (?, ?, ?, ?)`
    const data = ['title', 'genre', 'director', 'release_year', title, genre, director, release_year]

    pool.query(query, data, function(error) {
        if(error){
            console.log(error)
        }
        response.redirect('/movies')
    })

})

// GET MOVIES
app.get('/movies', (request, response) => {

    const query = 'select * from movie'

    pool.query(query, function(error, data) {
        if(error){
            console.log(error)
        }

        const movies = data
        response.render('movies', { movies })
    })
    
})

// GET MOVIE
app.get('/movies/:id', (request, response) => {

    const movieId = request.params.id

    const query = `select * from movie where ?? = ?` 
    const data = ['id', movieId]

    pool.query(query, data, function(error, data) {
        if(error){
            console.log(error)
        }

        const movie = data[0]
        response.render('movie', { movie })
    })
    
})

// EDIT MOVIE
app.get('/movies/edit/:id', (request, response) => {

    const movieId = request.params.id

    const query = `select * from movie where ?? = ?` 
    const data = ['id', movieId]

    pool.query(query, data, function(error, data) {
        if(error){
            console.log(error)
            return
        }

        const movie = data[0]
        response.render('editmovie', { movie })
    })
    
})

// UPDATE MOVIE
app.post('/movies/updatemovie', (request, response) => {

    const id = request.body.id
    const title = request.body.title
    const genre = request.body.genre
    const director = request.body.director
    const release_year = request.body.releasedt

    const query = `update movie set ?? = ?, ?? = ?, ?? = ?, ?? = ? where ?? = ?`
    const data = ['title', title, 'genre', genre, 'director', director, 'release_year', release_year, 'id', id]

    pool.query(query, data, function(error) {
        if(error){
            console.log(error)
            return
        }
        response.redirect('/movies')
    })
})

// DELETE MOVIE
app.post('/movies/remove/:id', (request, response) => {

    const movieId = request.params.id
    const query = `delete from movie where ?? = ?`
    const data = ['id', movieId]

    pool.query(query, data, function(error) {
        if(error){
            console.log(error)
            return
        }
        response.redirect('/movies')
    })
})


app.listen(3000)
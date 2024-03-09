const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')
const User = require('./models/User')
const Address = require('./models/Address')
const { json } = require('sequelize')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//TODO: verify what's it means (I forgot)
app.use(express.static('public'))       

app.get('/users/create', (request, response) =>{
    response.render('adduser')
})

app.post('/users/create', async (req, res) => {

    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on') {
        newsletter = true
    }else {
        newsletter = false
    }

    await User.create({ name, occupation, newsletter})
    res.redirect('/')
})

app.get('/users/:id', async (request, response) =>{
    
    const id = request.params.id

    const user = await User.findOne({raw: true, where: {id : id}})
    response.render('userview', { user })
})

app.post('/users/delete/:id', async (request, response) =>{

    const id = request.params.id

    const user = await User.destroy({raw: true, where: {id : id}})
    response.redirect('/')
})

app.get('/users/edit/:id', async (request, response) =>{

    const id = request.params.id

    const user = await User.findOne({include: Address, where: {id : id}})
    response.render('edituser', { user: user.get({ plain: true }) } )
})

app.post('/users/update', async (request, response) =>{

    const id = request.body.id
    const name = request.body.name
    const occupation = request.body.occupation
    let newsletter = request.body.newsletter

    if(newsletter === 'on') {
        newsletter = true
    }else {
        newsletter = false
    }
    const dataUser = {
        id,
        name, 
        occupation, 
        newsletter,
    }
    await User.update(dataUser, { where: {id : id}})
    response.redirect('/')
})

app.post('/address/create', async (request, response) => {

    const UserId = request.body.UserId
    const street = request.body.street
    const number = request.body.number
    const city = request.body.city

    const address = {
        UserId,
        street, 
        number, 
        city,
    }

    await Address.create(address)
    response.redirect(`/users/edit/${UserId}`)
})


app.post('/users/address/delete', async (request, response) =>{
    
    const UserId = request.body.UserId
    const id = request.body.id

    console.log('>>>>>>>>>>>>>>>>>>'+id)
    await Address.destroy({
        where: { id: id }
    })

    response.redirect(`/users/edit/${UserId}`)
})

app.get('/', async (request, response) => {
    const users = await User.findAll({raw: true})
    response.render('home', { users: users })
})

conn
//.sync({force: true}) // to recreate the tables
.sync()
.then(() => {
    app.listen(3000)
}).catch((error) => console.log(err))
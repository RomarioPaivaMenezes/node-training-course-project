const express = require('express')
const router = express.Router()

const path = require("path")
const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/user-form.html`)
})

router.post('/save', (req, res) => {
    console.log(req.body)
    res.sendFile(`${basePath}/index.html`)
})

module.exports = router
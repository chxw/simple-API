const express = require('express')
const bodyParser = require("body-parser")
const router = express.Router()
const data = require('./app.json')
const { Client } = require('pg')
const PORT = process.env.PORT || 5000
var app = express()
var urlencodedParser = bodyParser.urlencoded({extend: false})
var cors = require('cors')
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}

// Connect to Heroku PostgreSQL, configure using default options
const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl:{
		rejectUnauthorized: false
	}
})

client.connect()

// Functions
function isFloat(n){
	return Number(n) == n && n % 1 !== 0;
}


// Handle requests for vehicle location information
router.post('/rides', cors(corsOptions), urlencodedParser, (req, res) => {
  	var username = req.body.username
  	var lat = req.body.lat
  	var lng = req.body.lng

  	username = validator.escape(username)
  	lat = validator.escape(lat)
  	lng = validator.escpae(lng)

  	if (req.body.username && isFloat(lat) && isFloat(lng)){
  		client.query('INSERT INTO passenger (username, lat, lng) VALUES ('+username+', '+lat+', '+lng), (error, result) => {
  			if (!error){
  				res.json(data)
  			}
  			else {
  				res.json({error:"Whoops, something is wrong with your data!"})
  			}
  		}
  	}
  	res.json({error:"Whoops, something is wrong with your data!"})
 })

app.use("/", router)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
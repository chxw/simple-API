var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var validator = require('validator')
// const router = express.Router()
const data = require('./app.json')
const PORT = process.env.PORT || 5000

var urlencodedParser = bodyParser.urlencoded({extend: false})
app.use(bodyParser.json())

var cors = require('cors')
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}

// Connect to Heroku PostgreSQL, configure using default options
const { Client } = require('pg')
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

function isString(x){
	return Object.prototype.toString.call(x) === "[object String]"
}


// Handle requests for vehicle location information
app.post('/rides', cors(corsOptions), urlencodedParser, (req, res) => {
  	var username = req.body.username
  	var lat = req.body.lat
  	var lng = req.body.lng

  	username = validator.escape(username)
  	lat = validator.escape(lat)
  	lng = validator.escape(lng)

  	if (isString(req.body.username) && isFloat(lat) && isFloat(lng)){
  		client.query('INSERT INTO passenger (username, lat, lng) VALUES ('+username+', '+lat+', '+lng), (error, result) => {
  			if (!error){
  				res.json(data)
  			}
  			else {
  				res.send(500)
  			}
  		}
  	}
  	res.json({error:"Whoops, something is wrong with your data!"})
 })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var validator = require('validator')
const router = express.Router()
const data = require('./app.json')
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var cors = require('cors')
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}

// credentials
var un  = "cfnaezcfgnzdox"
var pw = "7d168de64eb50b1c90b85cbaf5c53a86e7729c6563bdacc40d571d2da896262f"
var host = "ec2-34-192-173-173.compute-1.amazonaws.com"
var port = "5432"
var db = "d2i0g7j8olar5k"

// Connect to Heroku PostgreSQL, configure using default options || manual enter options
var connectionString = "postgres://"+un+":"+pw+"@"+host+":"+port+"/"+db;
const { Client } = require('pg')
const client = new Client({
	connectionString: process.env.DATABASE_URL || connectionString,
	ssl:{
		rejectUnauthorized: false
	}
})
client.connect()

// // Serve static content in folder named "public"
// app.use(express.static(path.join(__dirname, 'public')))

// Functions
function isFloat(n){
	return Number(n) == n && n % 1 !== 0;
}

function isString(x){
	return Object.prototype.toString.call(x) === "[object String]"
}

function checkExists(table, field, value){
	client.query('select exists(select 1 from $1 where $2 = $3', [table, field, value])
		.then(result => console.log(result))
		.catch(e)
		.then(() => client.end())
}

app.use('/', router)

// Handle requests for vehicle location information
router.post('/rides', cors(corsOptions), (req, res) => {
	if (req.body.username && isFloat(parseFloat(lat)) && isFloat(parseFloat(lng))){
	  	var username = req.body.username
	  	var lat = req.body.lat
	  	var lng = req.body.lng

	  	username = validator.escape(username)
	  	lat = validator.escape(lat)
	  	lng = validator.escape(lng)

	  	client
	  		.query('INSERT INTO passenger (username, lat, lng) VALUES ($1, $2, $3);', [username, lat, lng])
			.then(res.json(data))
			.catch(e => res.send(500))
			.then(() => client.end())
  	}
  	res.json({"error":"Whoops, something is wrong with your data!"})
 })

// Handle requests for passenger information
router.get('/passenger.json', cors(corsOptions), (req, res) => {
	if(req.params.username){
		var username = req.params.username

		client
			.query('SELECT * FROM passenger WHERE username = $1', [username])
			.then(result => res.json(result))
			.catch(e => res.send(500))
			.then(() => client.end())
	}
	res.json([])
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var validator = require('validator')
var { check, validationResult } = require('express-validator')
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
const connectionString = "postgres://"+un+":"+pw+"@"+host+":"+port+"/"+db;
const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL || connectionString,
	ssl:{
		rejectUnauthorized: false
	}
})
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


// // Serve static content in folder named "public"
// app.use(express.static(path.join(__dirname, 'public')))

// Functions
function isFloat(n){
	return Number(n) == n && n % 1 !== 0;
}

function isString(x){
	return Object.prototype.toString.call(x) === "[object String]"
}

app.use('/', router)

// Handle requests for accessing vehicle location information
router.post('/rides', cors(corsOptions), check('username'), check('lat'), check('lng'), (req, res) => {
	var errors = validationResult(req)
	if (!errors.isEmpty() || Object.keys(req.body).length === 0 || !isFloat(req.body.lat) || !isFloat(req.body.lng)){
		res.json({"error":"Whoops, something is wrong with your data!"})
		return
	}

	var username = req.body.username
  	var lat = req.body.lat
  	var lng = req.body.lng

  	username = validator.escape(username)
  	lat = validator.escape(lat)
  	lng = validator.escape(lng)

  // 	client
  // 		.query('INSERT INTO passenger (username, lat, lng) VALUES ($1, $2, $3);', [username, lat, lng])
		// .then(res.json(data))
		// .catch(e => res.sendStatus(500))
		// .then(() => client.end())

	pool.connect((err, client, done) => {
	  if (err) throw err
	  client.query('INSERT INTO passenger (username, lat, lng) VALUES ($1, $2, $3);', [username, lat, lng], (err, res) => {
	    done()
	    if (err) {
	      res.sendStatus(500)
	    } else {
	      res.json(data)
	    }
	  })
	})
 })

// Handle requests for passenger information
router.get('/passenger.json', cors(corsOptions), check('username'), (req, res) => {
	var errors = validationResult(req)
	if (!errors.isEmpty() ||  Object.keys(req.query).length === 0){
		res.json([])
		return
	}

	var username = req.query.username
	username = validator.escape(username)

	// client
	// 	.query('SELECT * FROM passenger WHERE username = $1;', [username])
	// 	.then(result => res.json(result.rows))
	// 	.catch(e => res.sendStatus(500))
	// 	.then(() => client.end())

	pool.connect((err, client, done) => {
	  if (err) throw err
	  client.query('SELECT * FROM passenger WHERE username = $1;', [username], (err, res) => {
	    done()
	    if (err) {
	      res.sendStatus(500)
	    } else {
	      res.json(result.rows)
	    }
	  })
	})
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
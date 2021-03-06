require('dotenv').config()
var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var validator = require('validator')
var { check, validationResult } = require('express-validator')
const router = express.Router()
const path = require('path')
const data = require('./app.json')
const PORT = process.env.PORT || 5000
const winston = require('winston')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
var cors = require('cors')
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// Connect to Heroku PostgreSQL, configure using default options || manual enter options
const connectionString = "postgres://"+process.env.UN+":"+process.env.PW+"@"+process.env.HOST+":"+process.env.PORT+"/"+process.env.DB;
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
  logger.info('Unexpected error on idle client', err)
  process.exit(-1)
})

// // Serve static content in folder named "public"
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')

function isFloat(n){
	return Number(n) == n && n % 1 !== 0;
}

// ROUTES

app.use('/', router)

// Homepage
router.get('/', function(req, res){
	pool.connect((err, client, done) => {
	  if (err) throw err
	  client.query('select * from passenger;', (err, passenger) => {
	    done()
	    if (err) {
	      res.sendStatus(500)
	    } else {
	    	client.query('select * from vehicle;', (err, vehicle) => {
	    		if (err){
	    			res.sendStatus(500)
	    		} else{
	    			res.render('index', { passenger: passenger.rows, vehicle: vehicle.rows })
	    			res.end()
	    		}
	    	})
	    }
	  })
	})
})

// Passenger requests for vehicle information
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

	pool.connect((err, client, done) => {
	  if (err) throw err
	  client.query('INSERT INTO passenger (username, lat, lng) VALUES ($1, $2, $3);', [username, lat, lng], (err, result) => {
	    done()
	    if (err) {
	      res.sendStatus(500)
	    } else {
	      res.json(data)
	    }
	  })
	})
 })

// Vehicle check-in
router.post('/checkin', cors(corsOptions), check('username'), check('lat'), check('lng'), (req, res) => {
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

	pool.connect((err, client, done) => {
	  if (err) throw err
	  client.query('INSERT INTO vehicle (username, lat, lng) VALUES ($1, $2, $3);', [username, lat, lng], (err, result) => {
	    done()
	    if (err) {
	      res.sendStatus(500)
	    } else {
	      res.json(data)
	    }
	  })
	})
 })

// Request passenger table
router.get('/passenger.json', cors(corsOptions), check('username'), (req, res) => {
	var errors = validationResult(req)
	if (!errors.isEmpty() ||  Object.keys(req.query).length === 0){
		res.json([])
		return
	}

	var username = req.query.username
	username = validator.escape(username)

	pool.connect((err, client, done) => {
	  if (err) throw err
	  client.query('SELECT * FROM passenger WHERE username = $1;', [username], (err, result) => {
	    done()
	    if (err) {
	      res.sendStatus(500)
	    } else {
	      res.json(result.rows)
	    }
	  })
	})
})

// Request vehicle table
router.get('/vehicle.json', cors(corsOptions), check('username'), (req, res) => {
	var errors = validationResult(req)
	if (!errors.isEmpty() ||  Object.keys(req.query).length === 0){
		res.json([])
		return
	}

	var username = req.query.username
	username = validator.escape(username)

	pool.connect((err, client, done) => {
	  if (err) throw err
	  client.query('SELECT * FROM vehicle WHERE username = $1;', [username], (err, result) => {
	    done()
	    if (err) {
	      res.sendStatus(500)
	    } else {
	      res.json(result.rows)
	    }
	  })
	})
})

app.listen(PORT, () => logger.info('Listening on ${ PORT }'))
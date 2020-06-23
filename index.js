const express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser")
const router = express.Router()
var app = express()
const PORT = process.env.PORT || 5000

var urlencodedParser = bodyParser.urlencoded({extend: false})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

router.post('/rides', cors(), urlencodedParser, (req, res) => {
  	const username = req.body.username
  	const lat = req.body.lat
  	const lng = req.body.lng

  	if (req.body.username){
  		res.send('app.json')
  	}
  	res.send('{"error":"Whoops, something is wrong with your data!"}')
 }

app.use("/", router)
const express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser")
const router = express.Router()
var app = express()
const PORT = process.env.PORT || 5000

var urlencodedParser = bodyParser.urlencoded ({extend: false})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

router.post('/rides', cors(), urlencodedParser, (req, res) => {
  	const username = req.body.username
  	const lat = req.body.lat
  	const lng = req.body.lng

  	if (req.body.username && req.body.lat && req.body.lng){
  		res.send('app.json')
  	}
 }

app.use("/", router)
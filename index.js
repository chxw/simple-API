const express = require('express')
const bodyParser = require("body-parser")
const router = express.Router()
const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(function(req, res, next)){
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

router.post('/rides', (req, res) => {
  	const username = req.body.username
  	const lat = req.body.lat
  	const lng = req.body.lng

  	// if (req.body){
  		res.send('app.json')
  	// }
  }

app.use("/", router)
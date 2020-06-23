const express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser")
const router = express.Router()
const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

router.post('/rides', cors(), (req, res) => {
  	// const username = req.body.username
  	// const lat = req.body.lat
  	// const lng = req.body.lng

  	// if (req.body){
  		// res.send('[app.json]')
  	// }

  	res.send('[]')
  }
)

app.use("/", router)
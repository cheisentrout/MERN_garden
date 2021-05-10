/*============ DEPENDENCIES =============*/

const express = require('express')
const mongoose = require('mongoose')

/*============ CONFIGURATION =============*/

const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

/*============ MONGOOSE ERR/SUCCESS =============*/

mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

/*============= MIDDLEWARE ==============*/

//Use this middleware to return JSON data, rather than res.send/urlencoded which returns HTML:
app.use(express.json())
app.use(express.static('public'))

/*============ CONTROLLERS =============*/


/*============ ROUTES =============*/

app.get('/', (req, res) => {
  res.send('Hello world')
})

/*============== LISTENER ================*/

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})

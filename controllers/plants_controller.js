const express = require('express')
const plants = express.Router()
const Plant = require('../models/plants.js')

/*==========================  C  ============================
======================== CREATE ROUTE ======================*/

plants.post('/', (req, res) => {
  Plant.create(req.body, (err, createdPlant) => {
    Plant.find({}, (err, foundPlants) => {
      res.json(foundPlants)
    })
  })
})

/*=========================  R  =============================
======================== READ ROUTE ========================*/

plants.get('/', (req, res) => {
  Plant.find({}, (err, foundPlants) => {
    res.json(foundPlants)
  })
})

/*=========================  U  =============================
======================== UPDATE ROUTE ======================*/



/*=========================  D  =============================
====================== DELETE ROUTE ========================*/


module.exports = plants

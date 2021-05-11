const express = require('express')
const plants = express.Router()
const Plant = require('../models/plants.js')
const plantSeed = require('../models/plants_seed.js')

/*=========================  S  =============================
======================== SEED ROUTE ========================*/

// plants.get('/seed', (req, res) => {
//   Plant.insertMany(plantSeed, (err, manyPlants) => {
//     if (err) {
//       res.send(err)
//       console.log(err);
//     } else {
//       res.send(manyPlants)
//       console.log(manyPlants);
//     }
//     res.redirect('/plants')
//   })
// })

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

plants.put('/:id', (req, res) => {
  Plant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPlant) => {
      if (err) {
        res.send(err)
      } else {
        Plant.find({}, (err, foundPlant) => {
          res.json(foundPlant)
        })
      }
    }
  )
})

/*=========================  D  =============================
====================== DELETE ROUTE ========================*/

plants.delete('/:id', (req, res) => {
  Plant.findByIdAndRemove(
    req.params.id,
    (err, deletedPlant) => {
      Plant.find({}, (err, foundPlant) => {
        res.json(foundPlant)
      })
    }
  )
})


module.exports = plants

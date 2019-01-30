const router = require('express').Router();
const Car = require('../models').Car

router.get('/', (req, res) => {
  // res.send('car');
  Car.findAll({})
    .then(cars => {
      res.send(cars)
      console.log(cars,'ini carrrrrr')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin/add', (req, res) => {
  // res.send('masuk')
  res.render('addCar')
})

router.post('/admin/add', (req, res) => {
  let newCar = {
    brand: req.body.brand,
    type: req.body.type,
    color: req.body.color,
    year: req.body.year,
    rentalPrice: req.body.rentalPrice,
  }

  Car.create(newCar)
    .then(car => {
      res.send(car)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router;
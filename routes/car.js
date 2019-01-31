const router = require('express').Router();
const Car = require('../models').Car

router.get('/', (req, res) => {
  Car.findAll({})
    .then(cars => {
      // res.send(cars)
      res.render('cars', { data: cars })
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin', (req, res) => {
  Car.findAll({})
    .then(cars => {
      // res.send(cars)
      res.render('carsAdmin', { data: cars })
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin/add', (req, res) => {
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
      res.redirect('/cars/admin')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin/edit/:id', (req, res) => {
  Car.findByPk(req.params.id)
    .then(car => {
      res.render('editCar', { data: car })
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/admin/edit/:id', (req, res) => {
  Car.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      res.redirect('/cars/admin')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/admin/delete/:id', (req, res) => {
  Car.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect('/cars/admin')
    })
    .catch(err => {
      res.send(err)
    })
})


router.get('/users/rent/:id', (req, res) => {
  Car.findByPk(req.params.id)
    .then(car => {
      res.render('rentCar', { data: car })
    })
    .catch(err => {
      res.send(err)
    })
})



module.exports = router;


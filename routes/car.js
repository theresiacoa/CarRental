const router = require('express').Router();

router.get('/', (req, res) => {
  Model.Car.findAll()
    .then((data) => {
      res.render('carList.ejs', { data: data })
    })
    .catch((err) => {
      res.send(err);
    })
})

router.get('/rent', (req,res) => {
  
})



module.exports = router;
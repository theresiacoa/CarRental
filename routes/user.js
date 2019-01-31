const router = require('express').Router();
const Model = require('../models');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
//SMTP FOR EMAIL -------------------------------
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "activefox.carrental@gmail.com",
    pass: "carrental123"
  }
});

router.get('/', (req, res) => {
  res.redirect('/user/register');
})

//REGISTRATION
router.get('/register', (req, res) => {
  res.render('navbarPages/register.ejs', {
    purpose: 'register', msg: req.query.err
  })
})

router.post('/register', (req, res) => {
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    status: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  Model.User.create(newUser)
    .then(() => {
      //mail
      var mailOptions = {
        from: "activefox.carrental@gmail.com",
        to: `${req.body.email}`,
        subject: "email verification",
        html: "Hello, it's email verification"
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.render('navbarPages/register.ejs', {purpose: "login", msg: `verification email has been sent to your email`});
    })
    .catch(err => {
      res.redirect(`/user/register/?err=${err.errors[0].message}`);
    })
})

//LOGIN
router.get('/login', (req, res) => {
  res.render('navbarPages/register.ejs', {
    purpose: 'login', msg:null
  })
})

router.post('/login', (req, res) => {
  let userData = {};
  Model.User.findOne({
    where: { email: req.body.email }
  })
  .then((data) => {
    if (!data) {
      throw `You need to register first`
    } else {
      userData = data;
      return new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, data.password)
          .then(function (res) {
            res ? resolve(true) :
            resolve(false)
          });
      })
    }
  })
  .then((value) => {
    if (value) {
      req.session.userLoggedIn = {
        username: userData.firstName,
        id: userData.id,
        status: userData.status
      }
      res.redirect('/')
    } else {
      throw `username / password wrong`
    }
  })
  .catch(err => {
    res.send(err);
  })
})

//LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      res.send(err)
    } else {
      res.redirect('/');
    }
  })
  
})

module.exports = router;



// EMAIL ---------------------------------------
// router.get('/send', function (req, res) {
//   rand = Math.floor((Math.random() * 100) + 54);
//   host = req.get('host');
//   link = "http://" + req.get('host') + "/verify?id=" + rand;
//   mailOptions = {
//     to: req.query.to,
//     subject: "Please confirm your Email account",
//     html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
//   }
//   console.log(mailOptions);
//   smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log(error);
//       res.end("error");
//     } else {
//       console.log("Message sent: " + response.message);
//       res.end("sent");
//     }
//   });
// });
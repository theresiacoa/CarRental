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
  //mail
  var mailOptions = { 
    from: "activefox.carrental@gmail.com",
    to: `${req.body.email}`,
    subject: "email verification",
    html: 
    `Hello, Please click here to verify your data
    <form action="http://localhost:3000/user/verification" method="post">
    First Name: ${req.body.firstName}<br>
    <input type="hidden" name="firstName" value="${req.body.firstName}">
    <br>

    Last Name: ${req.body.lastName}<br>
    <input type="hidden" name="lastName" value="${req.body.lastName}">
    <br>

    Email:<br>
    <input type="hidden" name="email" value="${req.body.email}">
    <br>

    New Password:<br>
    <input type="password" name="password">

    <input type="submit" value="verified">
    </form>
    `
  }
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      res.redirect('/user/login')
    }
  });
})

router.post('/verification', (req, res) => {
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
      res.render('navbarPages/register.ejs', {purpose: "login", msg: null});
    })
    .catch(err => {
      res.redirect(`/user/register/?err=${err.errors[0].message}`);
    })
})

//LOGIN
router.get('/login', (req, res) => {
  res.render('navbarPages/register.ejs', {
    purpose: 'login', msg:req.query.err
  })
})

router.post('/login', (req, res) => {
  let userData = {};
  Model.User.findOne({
    where: { email: req.body.email }
  })
  .then((data) => {
    if (!data) {
      throw `username / password wrong`
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
    res.redirect(`/user/login/?err=${err}`);
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
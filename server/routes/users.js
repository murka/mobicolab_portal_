var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.options('*', cors.cors, (req, res) => { res.sendStatus(200); });

router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    });
});

router.post('/signup', cors.cors, (req,res,next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err})
      } else {
        if (req.body.firstname)
          user.firstname = req.body.firstname;
        if (req.body.lastname)
          user.lastname = req.body.lastname;
        if (req.body.middlename)
          user.middlename = req.body.middlename;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err})
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({succes: true, status: 'Registration Successful'})
          });
        });
      }
    });
});

router.post('/login', cors.cors, (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({succes: false, status: 'Login Unsuccessful', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({succes: false, status: 'Login Unsuccessful', err: 'Could not log in user'});
      }
      var token = authenticate.getToken({_id: req.user._id})
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({succes: true, status: 'Login Successful', token: token});
    });
  }) (req, res, next);
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('Вы не авторизованы');
    err.status = 403;
    next(err);
  }
})

router.get('/checkJTToken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JTW invalid', succes: false, err: info});
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JTW valid', succes: true, user: user});
    }
  }) (req, res);
})

module.exports = router;

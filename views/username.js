var express = require('express');
var helpers = require('./helpers');
var fs = require('fs');

var router = express.Router({
  mergeParams: true
});
router.all('/', verifyUser, function (req, res, next) {
  console.log(req.method, 'for', req.params.username, + ' at' + req.path);
  next()
})
router.get('/', function(req, res){
  var username = req.parms.username
  User.findOne({username: username}, function(err, user){
    res.render('user', {
      user: user,
      adress: user.locationS
    })
  })
})

router.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

router.get('/edit', function (req, res) {
  res.send('You want to edit ' + req.params.username + ' ???')
})

router.put('/', helpers.verifyUser, function (req, res) {
  var username = req.parms.username

  User.findOne({username: username}, function(err, user){
    if (err) {
      console.error(err);
    }
    user.name.full = req.body.name;
    user.location = location: req.body.location;
    user.save(function () {
      res.end();
    });
  });
});
router.delete('/', function (req, res) {
  var fp = helpers.getUserFilePath(req.parms.usrname)
  fs.unlinkSync(fp) //delete the file
  res.sendStatus(200)
})

module.express = router

var express = require('express');
var app = express();

var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate');
var JSONStram = require('JSONStram');
var bodyParser = require('body-parser');
var User = require('./db').User;


app.engine('hbs', engines.Handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profilepics', express.static('images'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/facicon.ico', function (req, res) {
  res.end()
})

app.get('/', function(req, res){
  User.find({}, function (err, users){
     res.render('index', {users: users})
  })
})

app.get('*.json', function (req, res) {
  res.download('./users/' + req.path, 'virus.exe')
})

app.get('/data/:username', function(req, res){
  var username = req.params.username
  var readable = fs.createReadStream('/users/' + username + '.json');
  readable.pipe(res)
})

aoo.get('/users/by/gender', function (req, res) {
  var gender = req.params.gender
  var readable = fs.createReadStream('users.json')

  readable
  .pipe(JSONStram.parse('*', function(user){
    if(user.gender === gender) return user
  }))
  .pipe(JSONStram.stringify('[\n ', ',\n ', '\n]\n'))
  .pipe(res)
})

app.get('/error/:username', function (req, res) {
  res.status(404).send'No user named' + req.params.usernaem + 'found')
})

var userRouter = require('./username')
app.use('/:username', userRouter)

app.listen(3000);

// app.route('/:username')
// .all(verifyUser, function (req, res, next) {
//   console.log(req.method, 'for', req.params.username);
//   next()
// }).get(heplers.verifyUser, function(req, res){
//   var username = req.parms.username
//   var user = helpers.getUser(username)
//   res.render('user', {
//     user: user,
//     adress: user.locationS
//   })
// }).put(helpers.verifyUser, function (req, res) {
//   var username = req.parms.username
//   var user = helpers.getUser(username)
//   user.location = req.body
//   helpers.saveUser(username, user)
//   res.end()
// }).delete(function (req, res) {
//   var fp = helpers.getUserFilePath(req.parms.usrname)
//   fs.unlinkSync(fp) //delete the file
//   res.sendStatus(200)
// })
// app.get('/', function(req, res){
//   var buffer = ''
//
//   user.forEach(function(user){
//     buffer += '<a href="/' + user.username + '">' + user.name.full + '</a><br>'
//   })
//       res.send(buffer);
// });
// app.get(/big.*/, function(req, res, next){
//   console.log('Bic User Access')
//   next()
// })

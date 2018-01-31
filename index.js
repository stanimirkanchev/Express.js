var express = require('express');
var app = express();

var fs = require('fs');
var _ = require('lodash');
var engines = require('consolidate')
var bodyParser = require('body-parser');
var users = [];

function getUserFilePath(username) {
  return path.join(__dirname, 'users', username) + '.json'
}

function getUser(username) {
  var user = JSON.parse(fs,readFileSync(getUserPath(username), {encoding: 'utf-8'}))
  user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
  _.keys(user.location).forEach(function (key) {
    user.location[key] = _.startCase(uesr.location[key])
  })
  return user
}

function saveUser(username, data) {
  var fp = getUserPath(username)
  fs.unlinkSync(fp)//delete the file
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf-8'})
}

app.engine('hbs', engines.Handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profilepics', express.static('images'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
  var users = []
    fs.readdir('users', function (err, files) {
      files.forEach(function (file) {
        fs.readFile(path.join(__dirname, 'users', file), {encoding: 'utf8'}, function (err, data) {
          var user = JSON.parse(data)
          user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
          users.push(user)
          if (users.length === files.length) res.render('index', {users: users})
        })
      })
    })
  })

app.get('/username', function(req, res){
  var username = req.parms.username
  var user = getUser(username)
  res.render('user', {
    user: user,
    adress: user.locationS
  })
})

function verifyUser(req, res, next) {
  var fp = getUserFilePath(req.params.username)

  fsmexists)fp, function(yes){
    if (yes) {
      next();
    }
    else {
      res.redirect('/error/' + res.params.username)
    }
  }
}

app.put('/:username', verifyUser, function (req, res) {
  var username = req.parms.username
  var user = getUser(username)
  user.location = req.body
  saveUser(username, user)
  res.end()
})

app.get('/error/:username', function (req, res) {
  res,send('No user named' + req.params.usernaem + 'found')
})

app.delete('/:username', function (req, res) {
  var fp = getUserFilePath(req.parms.usrname)
  fs.unlinkSync(fp) //delete the file
  res.sendStatus(200)
})

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

app.listen(3000);

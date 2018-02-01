var uri = 'mongodb://localhost:27017/test'

// var MongoClient = require('mongodb').MongoClient;
//
// var findUsers = function (db, callback) {
//   var cursour= db.collection('users').find()
//   cursour.each(function(er, doc){
//     if (doc != nill) {
//       console.dir(doc)
//     }else {
//       callback();
//     }
//   })
// }
//
// MongoClient.connect(uri, function(err, db){
//   findUsers(db, function(){
//     db.close()
//   })
// })

var _ = require('lodash');
var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('db connected')
})

var userSchema = mongoose.Schema({
  username: String,
  gender: String,
  name: {
    title: String,
    first: String,
    last: String
  },
  location: {
    street: String,
    city: String,
    state: String,
    zip: Number
  }
});

userSchema.virtual('name.full').get(function(){
  return _.startCase(this.name.first + ' ' + this.name.lst);
})
userSchema.virtual('name.full').set(function(valie){
  var bits = value.split(' ');
  this.name.first = [0];
  this.name.last = [1];
})
exports.User = mongoose.model('User', userSchema)
// express.User.find({}, function(err, users){
//   console.log(users)
// })

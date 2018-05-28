var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  firstName:String,
  lastName:String,
  email:String,
  password: String
});


// UserSchema.methods.comparePassword = function(candidatePassword) {
//   // because this is called as a method of u, the password will be the result
//   if (bcrypt.compareSync(candidatePassword, this.password)) {
//       return true;
//   };
//   return false;
// };



mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
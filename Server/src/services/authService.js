const User = require('../models/User');

exports.register = async function register({username, email, password, rePassword}) {

  if(!username || !email || !password || !rePassword){
    throw new Error('All fields are required.');
  }
  
  if(password != rePassword) {
    throw new Error('Passwords do not match.');
  }
}
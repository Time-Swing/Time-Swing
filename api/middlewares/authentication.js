const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models')

//compare user input password with hashedpassword value
function passwordsMatch(submittedPassword,storedPasswordHash){
  return bcrypt.compareSync(submittedPassword,storedPasswordHash)
}

passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
},(email,password,done)=>{
  User.findOne({where:{userName:email}})
    .then((user)=>{
      if(!user){
        console.log("\n\nUser dose not exist\n\n")
        return done(null,false,{message:'Failed to find user'})
      }

      if(passwordsMatch(password,user.hashedPassword)===false){
        console.log("\n\nThe passowrd did not match\n\n")
        return done(null,false,{message:'Failed Login'})
      }

      console.log('\n\nSuccessful Login\n\n')
      return done(null,user,{message:"Successfully Logged in"})
    })
    .catch(err=>{return done(err)})
}));

//save user into cookies by thier id
passport.serializeUser((user,done)=>{
   done(null,user.id)
});

passport.deserializeUser((id,done)=>{
  User.findByPk(id)
    .then((user)=>{
      if(!user){
        done(null,false)
        return;
      }

      done(null,user)
      return;
    })
    .catch(err=>{return done(err,null)})
});

//IF here is not a one line -> funciton, you need a return 
passport.isAuthenticated = ()=>{
  return (req,res,next) =>{
    return (req.user ? next() : res.sendStatus(401))
  }
}
module.exports = passport
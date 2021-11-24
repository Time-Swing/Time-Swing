const express = require("express"); //importing express
const router = express.Router(); // use router module from express to handle any req/res
const { User } = require('../models'); //imports the specific specific Agenda module
const passport = require("../middlewares/authentication");


router.post("/signup", (req, res) => {
	console.log("PSOT body:" + req.body);
	User.create({
		userName: req.body.userName,
		password: req.body.password,
		userPhone: req.body.userPhone,
	})
	.then((user)=>{
		req.login(user,()=>{res.status(201).json(user)})
	})
	.catch((err)=>{
		res.status(400).json({msg:'Failed Signup',err})
	})
	
});

// {
// 	"email":"linctjabc@gmail.com",
// 	"password":"test123456"
// } for this login need to provided the email and password
// not the userName and passpword
router.post('/login',
	passport.authenticate('local'),//only this auth passed the next func will run
	(req,res)=>{
		res.json(req.user)
	}
);

//a quick check if user alreay login in the session
router.get('/login',(req,res)=>{
	if(req.user){//cehck if user alreay in the req object
		res.json(req.user)
	}else{
		res.sendStatus(401)
	}
});

router.post('/logout',(req,res)=>{
	req.logout();
	res.status(200).json({message:'Logout successful!'})
})
module.exports = router;
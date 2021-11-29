const express = require("express"); //importing express
const router = express.Router(); // use router module from express to handle any req/res
const { User,Qrcode } = require('../models'); //imports the specific specific Agenda module
const passport = require("../middlewares/authentication");
const QRcode = require('qrcode');

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
//handle request for a QRcode
router.get('/loginQRCode',(req,res)=>{
	if(req.user){
		//1. create a qrcode record in the QRcode table
		//2. return QRcode object to frontend(may be just id)
		Qrcode.create({
			createTime: new Date().toString(),
			codeStatus: "0",
			mobileToken: req.user.mobileToken,
		})
		.then(qrCode =>{
			
			const url = "I got a qrcode from back-end "+qrCode.dataValues.id
			// console.log(url)
			const theQRCode = QRcode.toString(url,err=>console.log("error happend in generate QR code : "+err))
			// console.log(theQRCode)
			res.json(theQRCode)
		})
		.catch(err=>{
			console.log("there is a error on creating QR_code "+err)
			res.status(400).json({msg:'Failed Create QRCode1',err})
		})
	}else{
		res.sendStatus(401).json({msg:'Failed Create QRCode2',err})
	}
})
router.post('/logout',(req,res)=>{
	req.logout();
	res.status(200).json({message:'Logout successful!'})
})
module.exports = router;
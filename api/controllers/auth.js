const express = require("express"); //importing express
const router = express.Router(); // use router module from express to handle any req/res
const { User,Qrcode } = require('../models'); //imports the specific specific Agenda module
const passport = require("../middlewares/authentication");
const QRcode = require('qrcode');
const bcrypt = require('bcryptjs');

router.post("/signup", (req, res) => {
	console.log("PSOT body:" + req.body);
	User.create({
		userName: req.body.email,
		password: req.body.password,
		userPhone: req.body.phone,
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

router.post('/QRcodeLogin',(req,res)=>{
	const inputToken = req.body.inputToken
	console.log("\n\n "+inputToken+"\n\n")
	Qrcode.findOne({
		where:{mobileToken:inputToken}
	})
	.then(foundQRcode=>{
		console.log(foundQRcode)
		if(foundQRcode){//success find in the qrcode record
			console.log("inside the foundQRcode")
			User.findOne({
				where:{id:foundQRcode.dataValues.userId}
			})
			.then(user=>{
				console.log("the user is herer: "+user)//may need to change tempUser to user
			req.login(user,()=>{res.status(201).json(user)})
			})
		}
	})
	.catch((err)=>{
		res.status(400).json({msg:'Failed to match with Token',err})
	})
	
})

//handle request for a QRcode
router.get('/reqQRCode',(req,res)=>{
	if(req.user){
		//1. create a qrcode record in the QRcode table
		//2. return QRcode object to frontend, 
		const tempToken = bcrypt.hashSync(new Date().toString(),10)//the mobileToken should be unqieu
		Qrcode.create({
			userId:req.user.id,
			createTime: new Date().toString(),
			codeStatus: "0",                     //0 unUse   1 used success  -1 expired
			mobileToken: tempToken,
		})
		.then(qrCode =>{
			const urlQR = "http://localhost:3000/QRcodeLogin?token="+qrCode.dataValues.mobileToken
			console.log(urlQR)
			QRcode.toDataURL(urlQR,function(err,url){
				// console.log(url)
				res.json(url)
			})
		})
		.catch(err=>{
			console.log("there is a error on creating QR_code "+err)
			res.status(400).json({msg:'Failed Create QRCode',err})
		})
	}else{
		res.sendStatus(400).json({msg:'Failed Create QRCode in the DB'})
	}
})
router.post('/logout',(req,res)=>{
	req.logout();
	res.status(200).json({message:'Logout successful!'})
})
module.exports = router;
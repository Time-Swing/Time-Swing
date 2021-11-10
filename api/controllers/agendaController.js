const express = require("express"); //importing express
const router = express.Router(); // use router module from express to handle any req/res
const db = require("../models"); // imports the database
const { Agenda } = db; //imports the specific specific Agenda module

//200 - successful
//201 - object is successfully created
//204 - action is successfully done
//400 - error
//404 - object not found

// GET /api/agenda/       		//get all agendas
// GET /api/agendas/:id			//get an agenda
// PUT /api/agendas/:id      		//update an agenda
// POST /api/agendas/			//add new agendas
// DELETE  /api/agendas/:id 	  	//delete an agenda

router.get("/:id", (req, res) => {
	//get an agenda
	const id = req.params.id; // we want the id only of the user request object
	Agenda.findByPk(id) // find one id
		.then((agenda) => res.json(agenda)) // then respond with the result to front end written in json
		.catch((err) => res.sendStatus(404)); //error handling just in case there is any possible error occurs
});

router.get("/", (req, res) => {
	Agenda.findAll({}) //find all agendas
		.then((agendas) => res.json(agendas)) // then respond with the result to front end written in json
		.catch((err) => res.Status(404).json(err)); //error handling just in case there is any possible error occurs
});

router.put("/:id", (req, res) => {
	//update one agenda inforamtion
	const id = req.params.id; // we want the id only of the user request object
	Agenda.findByPk(id).then((agenda) => {
		// find by primary key id
		if(!agenda){
                return res.sendStatus(404)
           	}
		const updatedAgenda = req.body; // object parmas front-end pass in, getting whatever user passes from the front end
		agenda.set(updatedAgenda); // changed instance data, still not save into DB
		agenda
			.save() //save change into DB
			.then((result) => {
				res.json(result); // then respond with the result to front end
			})
			.catch((err) => {
				res.sendStatus(400).json(err); //error handling just in case there is any possible error occurs
			});
	});
});

router.delete("/:id", (req, res) => {
	//delete an agenda
	const id = req.params.id; // we want the id only of the user request object
	Agenda.findByPk(id).then((agenda) => {
		// find by primary key id
		agenda.destroy().then((result) => {
			//delete data in the DB
			res.status(204).json(result); // then respond with the status code to front end
		});
	});
});

router.post("/", (req, res) => {
	//add a new agenda
	const newAgenda = req.body; // get front-end object from user
	Agenda.create(newAgenda) //create new instance and save into the DB
		.then((result) => {
			res.status(201).json(result); // then respond with the result to front end
		})
		.catch((err) => {
			res.status(400).json(err); //error handling just in case there is any possible error occurs
		});
});

module.exports = router;

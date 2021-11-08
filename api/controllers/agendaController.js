const express = require('express')
const router = express.Router()
const db = require('../models')
const {Agenda} = db

//This is a data controller for agenda table/model
//it has following url call:
    // GET      /agendas/       	//get all agendas 
    // GET      /agendas/:id		//get an agenda 
    // PUT      /agendas/:id      	//update an agenda
    // POST     /agendas/			//add a new agenda
    // DELETE   /agendas/:id 	    //delete an agenda


router.get('/',(req,res)=>{
    Agenda.findAll({})
        .then(agendaData=>{
            res.json(agendaData)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
})

router.get('/:id',(req,res)=>{
    const {id} = req.params
    Agenda.findByPk(id)
        .then(target=>{
            if(!target){
                return res.sendStatus(404)
            }

            res.json(target)
        })
})

router.put('/:id',(req,res)=>{
    const {id} = req.params
    Agenda.findByPk(id)
        .then(target=>{
            if(!target){
                return res.sendStatus(404)
            }
            // console.log(req.body)
            target.set(req.body)
            // console.log(target)
            target.save()
                .then(result=>{
                    res.json(result)
                })
                .catch(err=>{
                    res.sendStatus(400).json(err)
                })
        })
})
router.post('/',(req,res)=>{
    const newAgenda = req.body
    console.log(newAgenda)
    Agenda.create(newAgenda)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
})
router.delete('/:id',(req,res)=>{
    const {id} = req.params
    Agenda.findByPk(id)
        .then(target=>{
            if(!target){
                res.sendStatus(404)
            }

            target.destroy()
            res.sendStatus(204)
        })
})

module.exports = router
const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
var fetchuser = require('../middleware/fethuser')
const { body, validationResult } = require('express-validator');

//Route 1: Fetch all Notes with user id using GET -login required 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{

    try {
        const notes = await Notes.find({user:req.user.id})
        success = true
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(400).send("Some Erorr Occurred!")
    }
})

//Route 2: Create a note with user id using POST -login required 
router.post('/addnote',fetchuser,[
    body('title',"Enter a valid title").isLength({min:3}),
    body('description',"Description must be a bit longer").isLength({min:5})
],async(req,res)=>{
    // check if any error are there
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        //destructuring
        const {title,tag,description} = req.body
        //Creating new note using ES6
        const note = new Notes({title,tag,description,user:req.user.id})
        const savednote = await note.save()
        res.json(savednote)
    } catch (error) {
        console.error(error)
        res.status(400).send("Some Erorr Occurred!")
    }
})

//Route 3: Update a note with note ID using PUT -login required 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{    
    try {
        const {title,tag,description} = req.body;
        const newNote = {}
        let success = false
        if(title){newNote.title = title}
        if(tag){newNote.tag = tag}
        if(description){newNote.description = description}
        let note = await Notes.findOne({"_id":req.params.id})
        if(!note){return res.status(404).send({success,msg:"Note not found"})}
        
        //Check is user id of note and loggedin user is same
        if(note.user != req.user.id){return res.status(401).send({success,msg:"Access denied"})}
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        success = true
        res.json({success,note})
    } catch (error) {
        console.error(error)
        res.status(400).send({success,msg:"Some Erorr Occurred!"})
    }
})

//Route 4: Delete a note with note ID using DELETE -login required 
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{    
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Note not found")}
        //Check is user id of note and loggedin user is same
        if(note.user != req.user.id){return res.status(401).send("Access denied")}
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"Deleted","note":note})
    } catch (error) {
        console.error(error)
        res.status(400).send("Some Erorr Occurred!")
    }
})
module.exports = router
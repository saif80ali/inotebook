const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
var fetchuser = require('../middleware/fethuser')
const { body, validationResult } = require('express-validator');

//Route 1: Fetch all user with user id using GET -login required 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
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
        const {title,tag,description} = req.body
        const note = await new Notes({title,tag,description,user:req.user.id})
        const savednote = await note.save()
        res.json(savednote)
    } catch (error) {
        console.error(error)
        res.status(400).send("Some Erorr Occurred!")
    }
})
module.exports = router
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fethuser')

//key for signing the token
const JWT_SECRET = "Saifisagoodb%oy"

//ROUTE 1:- Creating a user /api/auth/createuser
router.post('/createuser',[
    body('name',"Enter valid name").isLength({min:3}),
    body('email',"Enter valid email").isEmail(),
    body('password',"Enter valid password").isLength({min:5})
],async (req,res)=>{
    // check if any error are there
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
    let user = await User.findOne({email:req.body.email})

    if(user){
        return res.status(400).json({success,errors:"User with this email already exists" });
    }
    var salt = bcrypt.genSaltSync(10);
    var secPassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name:req.body.name,
        email: req.body.email,
        password: secPassword,
    })
    const data={
        user:{
            id:user.id
        }
    } 
    const signedToken = jwt.sign(data,JWT_SECRET)
    res.json({success,signedToken})
   
    }catch(error){
        console.error(error)
        res.status(400).send("Some Erorr Occurred!")
    }
})
//ROUTE 2:- Log in with a user credentials /api/auth/login
router.post('/login',[
    body('email',"Enter valid email").isEmail(),    
    body('password',"Password cannot be blank").exists()],async (req,res)=>{

    const errors = validationResult(req);
    // check if any error are there
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        //destructuring from req.body
        let success = false
        const {email,password} = req.body
        let user = await User.findOne({email})
        if(!user){
            res.json({success,error:"Please check your credentials"})
        }
        let passComp = bcrypt.compareSync(password, user.password);
        if(!passComp){
            res.json({success,error:"Please check your credentials"})
        }

        const data={
            user:{
                id:user.id
            }
        } 
        const signedToken = jwt.sign(data,JWT_SECRET)
        success = true
        res.json({success,signedToken})
    }catch(error){
        console.error(error)
        res.status(400).send("Some Erorr Occurred!")
    }
})

//ROUTE 3 :- fetching a particular user details /api/auth/getuser
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        //fisrt fetchuser() function will run the reeq.user will have the value
        let userId = req.user.id
        const userDetails = await User.findById(userId).select('-password')
        res.send(userDetails)
        
    } catch(error){
        console.error(error)
        res.status(400).send("Some Erorr Occurred!")
    }
})

//ROUTE 4 :- fetching all user details /api/auth/getuser
router.get('/fetchalluser', async (req,res)=>{
    try {
        //fisrt fetchuser() function will run the reeq.user will have the value
        const userDetails = await User.find().select('-password')
        res.send(userDetails)
        
    } catch(error){
        console.error(error)
        res.status(400).send("Some Erorr Occurred!")
    }
})
module.exports = router

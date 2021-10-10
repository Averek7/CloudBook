const express = require('express');
const User = require('../models/User');                                  // Structure or model in which data is stored
const router = express.Router();                                         // To connect to its various components
const bcrypt = require('bcryptjs');                                      // Encryption of password   
const { body, validationResult } = require('express-validator');         // Validation of models
const jwt = require('jsonwebtoken');                                      // User Authentication token
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "secret_token_user";

//Route1 :-  POST request sent "/api/auth/createuser" ! To create the user so as to store in DB
router.post('/createuser', [

    // Express Validator
    body('name', 'Enter a valid name').isLength({ min: 5}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Password length must be at least 8 characters").isLength({ min: 8}),

], async(req, res) => {

    // if there are errors, return a Bad Request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Checks whether the data is stored in the database

    // console.log(req.body);
    // // Creating a User using POST request on "/api/auth/"
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);


    // Checks whether the user with this email exists or not

    try {
        // returns a promise that is resolved by async/await approach
        let success;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({success, error : "Sorry a user with same email already exists"});
        }

         //Returns Promise
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        //Creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });


        const data = {
            user:{
                id:user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

        // res.json({"Successfully":`Merged ${user}`});
    }
    //Catching the internal error
    catch(err) {
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }
});

//Route2 :-  POST request sent "api/auth/login" ! To authenticate the user so as to store in DB
router.post('/login', [

    // Express Validator
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Password length must be at least 8 characters").isLength({ min: 8}),

], async(req, res) => {

    // if there are errors, return a Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        // Finds user's email
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({errors: "Please enter correct credentials."});
        }
        let success;
        //Compares password with the entered password
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            res.status(400).json({success, errors: "Please enter correct credentials."});
            success = false;
        }

        // Here we took id as "reference signature" of token
        const payLoad = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(payLoad, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }
});

//Route3 :-  POST request sent "api/auth/getuser" ! To get logged in user details
router.post('/getuser', fetchuser, async(req, res) => {       // created a middle-ware "fetchuser"
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({user});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }
});

router.delete('/deleteuser', fetchuser, async(req, res) => {       // created a middle-ware "fetchuser"
    try {
        const user = await User.findByIdAndDelete({user: req.user.id});
        res.json({message: 'User deleted', user })
    } catch (err) {
        res.status(500).send(err.message,`Some error occurred !`);
    }
});


module.exports = router
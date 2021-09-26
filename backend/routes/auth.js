const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// POST request sent !
router.post('/createuser', [
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
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({error : "Sorry a user with same email already exists"});
    }
    
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    res.json({"Successfully":"Merged"});

});


module.exports = router
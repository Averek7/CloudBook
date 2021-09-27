const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');     
const { body, validationResult } = require('express-validator');         // Validation of models                             // Structure or model in which data is stored
const fetchuser = require('../middleware/fetchuser');


// Route 1: - Get all notes via GET "api/notes/fetchallnotes".... Login Required !
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user : req.user.id});
        res.json({notes});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }
})


// Route 1: - Adding new notes via POST "api/notes/addnotes".... Login Required !
router.get('/addnotes', fetchuser, [

    // Express Validator
    body('title', 'Enter a valid title').isLength({ min: 5}),
    body('description', 'Enter a valid description').isLength({ min: 10}),

], async (req, res) => {

    // if there are errors, return a Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const notes = await Notes.find({user : req.user.id});
        res.json({notes});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }
})



module.exports = router
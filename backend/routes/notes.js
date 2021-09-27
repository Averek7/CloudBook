const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');         // Validation of models                             // Structure or model in which data is stored
const fetchuser = require('../middleware/fetchuser');


// Route 1: - Get all notes via GET "api/notes/fetchallnotes".... Login Required !
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json({ notes });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }
})


// Route 2: - Adding new notes via POST "api/notes/addnotes".... Login Required !
router.post('/addnotes', fetchuser, [

    // Express Validator
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 10 }),

], async (req, res) => {
    const { title, description, tag } = req.body;

    // if there are errors, return a Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await notes.save();
        res.json(savedNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }
})

// Route 3: - Update note via PUT "api/notes/updatenotes".... Login Required !
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Checks whether the user is associated with the specified notes 
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found !") }
        // Allows Updation
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Access Denied !") }

        // Find the note to be updated
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }
})

// Route 4: - Delete note via PUT "api/notes/deletenotes".... Login Required !
router.put('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
            //Checks whether the user is associated with the specified notes 
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found !") }
    // Allows Deletion
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Access Denied !") }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Successfully Deleted", note });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occurred");
    }

});

module.exports = router
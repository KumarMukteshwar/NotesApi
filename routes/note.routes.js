const express = require('express');
const auth = require('../middleware/auth.middleware');
const NoteModel = require('../models/note.model');
const noteRouter = express.Router();

noteRouter.post('/create', auth, async (req, res) => {
    const { title, description, status,userId,userName} = req.body;
    try {
        const note = new NoteModel({ title, description, status,userId,userName});
        await note.save();
        res.status(200).send("Note is created successfully");
    } catch (error) {
        res.status(500).send("Internal server error. Please try again");
    }
});

noteRouter.get('/all', auth, async (req, res) => {
    const {userId}=req.body;
    try {
        const notes = await NoteModel.find({userId: userId});
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send("Internal server error. Please try again");
    }
});

noteRouter.patch('/update/:noteId', async (req, res) => {
    const { title, description, status, userId,userName } = req.body;
    const { noteId } = req.params;
    try {
        const note = await NoteModel.findOne({ _id: noteId });
        console.log(note);
        if (!note) {
            return res.status(404).send("Note not found");
        }
        if (note.userId === userId) {
            await NoteModel.updateOne({ _id: noteId }, { $set: { title, description, status } });
            res.status(200).send("Note is updated successfully");
        } else {
            res.status(401).send("You are not authorized to update this note hello");
        }
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send("Internal server error. Please try again");
    }
});

noteRouter.delete('/delete/:noteId', async (req, res) => {
    const { noteId } = req.params;
    try {
        const note = await NoteModel.findOne({ _id: noteId });
        if (!note) {
            return res.status(404).send("Note not found");
        }
        await NoteModel.deleteOne({ _id: noteId });
        res.status(200).send("Note is deleted successfully");
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send("Internal server error. Please try again");
    }
})


module.exports = noteRouter;

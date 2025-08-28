import { Note } from '../models/noteModel.js';
import asyncHandler from '../middleware/asyncHandler.js';


//@desc   get notes
//@route  GET /api/notes
//@access private
export const getNotes = asyncHandler (async (req, res) => {
    console.log({message: `Z: back/controller/getNotes...`})

    const notes = await Note.find({user: req.user.id});

    console.log({message: `Z: back/controller/getNotes... ${notes.length}, ${req.user.name}`})
    res.status(200).json(notes);
});


//@desc   set note
//@route  POST /api/notes/
//@access private
export const setNote = asyncHandler (async (req, res) => {
    console.log({message: `Z: back/controller/setNote...`})
    console.log({message: `Z: back/controller/setNote... user-id: ${req.user.id} req-body: ${req.body}`})
    
    if (!req.body.text) {
        res.status(400);
        throw new Error('please add a text')
    }

    const note = await Note.create({
        text: req.body.text,
        user: req.user.id
    })
    
    res.status(200).json(note);
});


//@desc   update note
//@route  PUT /api/notes/:id
//@access private
export const updateNote = asyncHandler( async (req, res) => {
    console.log(`Z: back/controller/updateNote... req.pamas.id: ${req.params.id} req-body: ${req.body}`);

    const note = await Note.findById(req.params.id);
    console.log(`Z: back/controller/updateNote... existing note: ${note} `);

    if(!note) {
        res.status(400);
        throw new Error('Z: back/controller/update... note not found');
    }
        
    //check user
    if(!req.user) {
        res.status(401)
        throw new Error('Z: back/controller/update... user not found')
    }

    //make sure only logged in user matches the note user
    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Z: back/controller/update... user not authorized for this note')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, 
        {new: true});

    res.status(200).json(updatedNote);
});


//@desc   delete note
//@route  DELETE /api/notes/:id
//@access private
export const deleteNote = asyncHandler (async (req, res) => {
    console.log({message: `Z: backend/controller/delete... note-id ${req.params.id} ...`});

    const note = await Note.findById(req.params.id);

    if(!note) {
        res.status(400);
        throw new Error('Z: back/contro/delete...  note not found');
    }
    
    //check user from middleware (req.user)
    if(!req.user) {
        res.status(401)
        throw new Error('Z: back/control/delete... user not found')
    }
    
    //make sure only logged in user matches the note owner
    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Z: back/control/delete... user not authorized')
    }

    await note.deleteOne();

    res.status(200).json({ id: req.params.id });
});
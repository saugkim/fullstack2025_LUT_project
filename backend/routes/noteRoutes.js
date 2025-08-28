import express from 'express'
import {
    getNotes,
    setNote,
    updateNote,
    deleteNote
} from '../controllers/noteController.js'
import {protect} from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

const noteRouter = express.Router()

noteRouter.route('/')
    .get(protect, getNotes)
    .post(protect, setNote);
noteRouter.route('/:id')
    .put(protect, updateNote)
    .delete(protect, deleteNote);

export default noteRouter;


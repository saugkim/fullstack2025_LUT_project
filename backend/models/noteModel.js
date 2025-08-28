import mongoose from "mongoose"


const noteSchema = mongoose.Schema(
    { 
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        },
        isImportant: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    {
        timestamps: true
    },
);

export const Note = mongoose.model('Note', noteSchema)
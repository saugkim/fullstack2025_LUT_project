import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: []
};

const notesSlice = createSlice({
  name: '_notes',

  initialState,
  
  reducers: {
    setNotesState: (state, action) => {
      state.notes = action.payload;
    },
    addNoteState: (state, action) => {
      state.notes.push(action.payload);
    },
    resetNotesState: (state) => {
      state.notes = []
    }
  },
});

export const { setNotesState, addNoteState, resetNotesState } = notesSlice.actions;

export default notesSlice.reducer;

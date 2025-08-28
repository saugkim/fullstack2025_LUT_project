import { apiSlice } from './apiSlice';
const NOTES_URL = '/api/notes';

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: `${NOTES_URL}`,
        method: 'GET',
      }), providesTags: ['Note']
    }),        
    createNote: builder.mutation({
      query: (data) => ({
        url: `${NOTES_URL}`,
        method: 'POST',
        body: data.content,
      }), invalidatesTags: ['Note'] 
    }),
    updateNote: builder.mutation({
      query: (data) => ({
        url: `${NOTES_URL}/${data.id}`,
        method: 'PUT',
        body: data.content,
      }), invalidatesTags: ['Note']
    }), 
    deleteNote: builder.mutation({
      query: (data) => ({
        url: `${NOTES_URL}/${data.id}`,
        method: 'DELETE',
      }), invalidatesTags: ['Note']
    }),
  }),
})

export const {
    useGetNotesQuery,
    useCreateNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApiSlice

import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateNoteMutation, useDeleteNoteMutation } from '../slices/notesApiSlice.js';
import NoteContainer from '../components/NoteContainer.jsx';

const SingleNoteScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [text, setText] = useState('')
 
  const { userInfo } = useSelector((state) => state._auth);
  if (!userInfo)
    navigate('/login')

  const locationStateInfo = location.state;
  if (!locationStateInfo) 
    navigate('/notes')

  const noteId = locationStateInfo._id;
  console.log(noteId);
  
  const noteText = locationStateInfo._text;
  console.log(noteText);

  useEffect(() => {
    if (!userInfo) 
      navigate('/login')

    if (!locationStateInfo) 
      navigate('/notes')

  }, [navigate, userInfo, dispatch])

  
  const [ updateNote, {} ] = useUpdateNoteMutation();
  const [ deleteNote, {} ] = useDeleteNoteMutation();

  //@desc delete item button-onClick
  const deleteThisItem = async () => {
    const inputData = {id: noteId}
    try {
      const res = await deleteNote(inputData);
      console.log(inputData);
      toast.success(`Note removed successfully`);
      navigate('/notes');
    } catch (e) {
      toast.error(err?.data?.message || err.error);
    }
  }

  //@desc update note content form submit
  const submitHandler = async (e) => {  
    e.preventDefault();
    const { mynote } = e.target;
  
    const inputData = {
      id: noteId, 
      content: { text : mynote.value }
    }
  
    try {
      const res = await updateNote(inputData).unwrap();
      console.log(res);
      toast.success(`Note updated successfully`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  

  return (
    <div className=' py-5'> 

      <h3 className='text-center mb-4'>View and update current note</h3>

      <NoteContainer>    
        <Form onSubmit={submitHandler} className='w-100'>
          <div className='d-flex justify-content-between p-3' >   
            <Button type='submit' variant='primary'>
              UPDATE
            </Button>
            <Button variant='secondary' onClick={() => navigate('/notes')}>
              TO LIST
            </Button>
          </div>
            
          <div className='d-flex justify-content-center p-2'>   
            <textarea 
              className="form-control" 
              rows="5" 
              name='mynote'
              type='textarea'
              defaultValue={noteText}
            ></textarea>
          </div>
        </Form>
        
        <Button variant='outline-danger m-3' onClick={deleteThisItem}>
            DELETE NOTE
        </Button>
      </NoteContainer>
    </div>
  )
};

export default SingleNoteScreen;

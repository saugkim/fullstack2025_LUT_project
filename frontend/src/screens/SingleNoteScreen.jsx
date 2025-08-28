import { Container, Card, Button, Form} from 'react-bootstrap';
import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateNoteMutation, useDeleteNoteMutation } from '../slices/notesApiSlice.js';

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

  const deleteThisItem = async () => {
    const inputData = {id: noteId}
    try {
      const res = await deleteNote(inputData);
      console.log(inputData);
      toast.success(`Goal deleted successfully`);
    } catch (e) {
      toast.error(err?.data?.message || err.error);
    }
  }


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
      toast.success(`Goal updated successfully`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  return (
    <div className=' py-5'> 

      <h3 className='text-center mb-4'>View and update current note</h3>

      <Container className='d-flex justify-content-center'>
        <Card className='p-3 d-flex flex-column align-items-center hero-card bg-light w-75'>
          
          <Form onSubmit={submitHandler} className='w-100'>
            <div className='d-flex justify-content-between'>   
              <Button type='submit' variant='primary' className='mt-3 mx-3'>
                UPDATE
              </Button>
              <Button variant='secondary' className='mt-3 mx-3' href='/notes'>
                BACK TO LIST
              </Button>
            </div>
            
            <div className='d-flex justify-content-center'>   
              <textarea className="form-control m-2 mb-4" rows="5" 
                  name='mynote'
                  type='textarea'
                  defaultValue={noteText}
              ></textarea>
            </div>
          </Form>
        
          <Button variant='outline-danger mt-2' onClick={deleteThisItem} href='/notes'>
              DELETE GOAL
          </Button>

        </Card>
      </Container>

    </div>
  )
};

export default SingleNoteScreen;

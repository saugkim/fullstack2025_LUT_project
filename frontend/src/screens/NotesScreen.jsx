import { Container, Card, Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetNotesQuery, useCreateNoteMutation } from '../slices/notesApiSlice.js';
import Loader from '../components/Loader';
import { addNoteState } from '../slices/notesSlice.js';

const NotesScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state._auth);
  if (!userInfo) {
    navigate('/login')
  }

  const { notes } = useSelector((state) => state._notes)

  const { data: items=[], isLoading } = useGetNotesQuery({});
  const [ createNote, {} ] = useCreateNoteMutation();

  useEffect(() => {    
    if (!userInfo) {
      navigate('/login')
    }

    console.log(notes.length, items.length);

  }, [dispatch, navigate, userInfo, notes])


  const submitHandler = async (e) => {  
    e.preventDefault();
    
    const { mynote } = e.target;
    console.log('target value: ', mynote.value);
  
    const inputData = { content: { text : mynote.value } }

    try {
      const res = await createNote(inputData);
      console.log(res);
  
      if (res.data) {
        toast.success(`Goal updated successfully`);
        dispatch(addNoteState(res.data));
      } else {
        toast.error('something wrong');
      }
    } catch (e) {
      toast.error(err?.data?.message || err.error);
    }
    e.target.reset();
  };
  
  return ( 
    <div>  
      <Container className='d-flex p-1 justify-content-center'>  
         <Card className='d-flex p-2 align-items-center hero-card bg-light w-100'>  
          
          <h5 className='text-center px-3 m-2 mb-3'> My current notes ({items.length})</h5>  
          {items.length === 0 ? <p>no notes, please create new ones</p> : <></> }
      
          <div className='w-100 p-2'>
            <ul className="list-group list-group-items">
              {items.map((item) => 
                <li 
                  className='list-group-item' 
                  key={item._id} 
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    navigate(`/update`, { state: { _id: item._id, _text: item.text } }); 
                  }}>
                  {item.text.length > 35 ? `${item.text.substring(0, 35)} ...` : item.text}  
                </li> 
              )} 
            </ul>
          </div>

        </Card>
      </Container>
      
      <Container className='d-flex p-1 justify-content-center'>
        <Card className='p-3 mt-5 d-flex align-items-center hero-card bg-light w-100'>      
          <Form className= 'form w-100' onSubmit={submitHandler} >
            
            <div className='d-flex justify-content-between'>   
              <h5 className='text-center px-3'> Add Note </h5>
              <Button type='submit' variant='outline-secondary' className='mx-3'>
                CREATE
              </Button>
            </div>
            
            <div className='d-flex justify-content-center'>   
              <textarea className="form-control m-2" rows="5" 
                  name='mynote'
                  type='textarea'
                  placeholder='Write new note here...'
              ></textarea>
            </div>

          </Form>
        </Card>
      </Container>

      {isLoading && <Loader />}
    </div>
  );
};

export default NotesScreen;
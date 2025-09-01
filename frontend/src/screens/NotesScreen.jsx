import { Container, Card, Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetNotesQuery, useCreateNoteMutation, useUpdateNoteMutation } from '../slices/notesApiSlice.js';
import Loader from '../components/Loader';
import { addNoteState } from '../slices/notesSlice.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import Note from '../components/Note.jsx'

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
  const [ updateNote, {} ] = useUpdateNoteMutation();


  useEffect(() => {    
    if (!userInfo) {
      navigate('/login')
    }

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
        toast.success(`Note updated successfully`);
        dispatch(addNoteState(res.data));
      } else {
        toast.error('something went wrong');
      }
    } catch (e) {
      toast.error(err?.data?.message || err.error);
    }
    e.target.reset();
  };

  const toggleIsFavorite = async (item) => {

    const inputData = {
      id: item._id, 
      content: { text : item.text, isImportant: !item.isImportant },
    }

    try {
      const res = await updateNote(inputData)
                        .unwrap();
      console.log(res);
      toast.success('Note updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

//    items.map((x) => (x._id === item._id) ? {...x, isImportant:!x.isImportant } : x);
  }

  
  return ( 
    <div>  
      <Container className='d-flex p-1 justify-content-center'>  
        <Card className='d-flex p-2 align-items-center hero-card bg-light w-100'>  
          
          <h5 className='text-center px-3 m-2 mb-3'> Current notes ({items.length}) </h5> 
                        
          {items.length === 0 ? <p>no notes, create new ones!!</p> : <></> }

          <div className='w-100 p-2'>
            <ul className="list-group list-group-items">
              {items.map((i) => 
                <li 
                  className='list-group-item' 
                  key={i._id} 
                >
                  <Note 
                    item = {i}
                    onToggle={() => toggleIsFavorite(i)} />
                </li> 
              )} 
            </ul> 
          </div>   

          {/* <div>
            {items.map((item) => 
              <li className='list-group-item' key={item._id} >
                <div className='d-flex align-items-center justify-content-between pr-2'
                     onDoubleClick={(e) => {
                       e.preventDefault();
                       navigate(`/update`, { state: { _id: item._id, _text: item.text } }); 
                     }} >
                  <h6>{item.text.length > 40 ? `${item.text.substring(0, 40)} ...` : item.text}</h6> 
                  { item.isImportant ?
                    <i className='bi bi-star-fill' style= { {color: 'green'} } 
                       onClick={() => {toggleItmeIsFavorite(item) }} />
                    :
                    <i className='bi bi-star' style= { {color: 'green'} } 
                       onClick={() => { toggleItmeIsFavorite(item) }} />}
                </div>
              </li>
            )}  
         </div> */}

        </Card>
      </Container>
      
      <Container className='d-flex p-1 justify-content-center'>
        <Card className='p-3 mt-5 d-flex align-items-center hero-card bg-light w-100'>      
          <Form className= 'form w-100' onSubmit={submitHandler} >
            
            <div className='d-flex justify-content-between'>   
              <h5 className='text-center px-3'> Add new </h5>
              <Button type='submit' variant='outline-primary' className='mx-3'>
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
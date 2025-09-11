import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetNotesQuery, useCreateNoteMutation, useUpdateNoteMutation } from '../slices/notesApiSlice.js';
import Loader from '../components/Loader';
import { addNoteState } from '../slices/notesSlice.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import Note from '../components/Note.jsx'
import NoteContainer from '../components/NoteContainer.jsx';


const NotesScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state._auth);
  if (!userInfo) {
    navigate('/login')
  }

  const { notes } = useSelector((state) => state._notes)
  const [ sorted, setSorted ] = useState(false);

  const { data: items=[], isLoading } = useGetNotesQuery({});
  const [ createNote, {} ] = useCreateNoteMutation();
  const [ updateNote, {} ] = useUpdateNoteMutation();


  useEffect(() => {    
    if (!userInfo) {
      navigate('/login')
    }

  }, [navigate, userInfo])


  //@create new note submit handler
  const submitHandler = async (e) => {  
    e.preventDefault();
    
    const { mynote } = e.target;
    console.log('target value: ', mynote.value);
  
    const inputData = { content: { text : mynote.value } }

    try {
      const res = await createNote(inputData);
      console.log(res);
  
      if (res.data) {
        toast.success(`Note created/added successfully`);
        dispatch(addNoteState(res.data));
      } else {
        toast.error('something went wrong');
      }
    } catch (e) {
      toast.error(err?.data?.message || err.error);
    }
    e.target.reset();
  };


  //@desc update note to mark as favorite 
  const toggleIsImportant = async (item) => {

    const inputData = {
      id: item._id, 
      content: { text: item.text, isImportant: !item.isImportant },
    }

    try {
      const res = await updateNote(inputData)
                        .unwrap();
      console.log(res);
      toast.success('Note updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  //@desc double click go to single note screen
  const navigateToSingleNote = (item) => {
    navigate(`/note`, { state: { _id: item._id, _text: item.text }} );     
  }
  
  
  return ( 
    <>   
      <NoteContainer> 
        <h5 className='text-center m-2'> Current notes ({items.length})</h5> 
                        
        {items.length === 0 ? 
          (<p className='m-2'>no notes, create new ones!!</p>)
          :
          (<div className='d-flex justify-content-between align-items-center w-100 px-2'>
            <p className='m-2'>double-click a note below to edit</p>
            <Button 
              variant='outline'
              style={{ color: 'green', border: 'solid' }}
              onClick={() => sorted ? setSorted(false) : setSorted(true)}
            > 
              { sorted ? 
                <span>SHOW ALL</span> 
                :
                <> 
                  <span>SHOW </span>
                  <span><i className='bi bi-star-fill' style={ {color: 'green'} }/></span>
                </>
              } 
            </Button>
          </div>)
        }

        <div className='w-100 p-2 mt-2'>
          <ul className="list-group list-group-items">
            {sorted ?   
              (items.filter((i) => i.isImportant === true).map((i) => 
                <li 
                  className='list-group-item' 
                  key={i._id} >

                  <Note 
                    item = {i}
                    onToggle={() => toggleIsImportant(i)}
                    onDoubleClick ={() => navigateToSingleNote(i)} />
                </li> 
              ))
              :
              (items.map((i) => 
                <li 
                  className='list-group-item' 
                  key={i._id} >

                  <Note 
                    item = {i}
                    onToggle={() => toggleIsImportant(i)}
                    onDoubleClick ={() => navigateToSingleNote(i)} />
                </li> 
              ))
            }
          </ul> 
        </div>   
      </NoteContainer>

      <NoteContainer>        
        <Form className= 'form w-100' onSubmit={submitHandler} >
          <div className='d-flex justify-content-between align-items-center px-3 my-1'>   
            <h6>add new</h6>
            <Button type='submit' variant='outline-primary'>
                CREATE
            </Button>
          </div>
            
          <div className='d-flex justify-content-center p-2 m-1'>   
            <textarea 
              className="form-control" rows="5" 
              name='mynote'
              type='textarea'
              placeholder='Write new note here...'
            />
          </div>
        </Form>
      </NoteContainer>

      {isLoading && <Loader />}
    </>
  );
};

export default NotesScreen;
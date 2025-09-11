import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Intro = () => {

  const { userInfo } = useSelector((state) => state._auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center bg-light w-75'>
          <p className='text-center mb-4'>
            This application is implemented on top of 
            <br></br>
            the <a href='https://www.traversymedia.com/blog/mern-crash-course-part-1'>MERN authentication</a> project.
            <br></br>
            <p></p>
            This app uses Redux Toolkit & React Bootstrap, Vite and Express & MongoDB. 
          </p>

          {userInfo ? (
            <div className='d-flex'>
              <Button variant='primary' href='/notes' className='me-3'>
                View My Notes
              </Button>
            </div>
            ) : (
            <div className='d-flex'>
              <Button variant='primary' href='/login' className='me-3'>
                Sign In
              </Button>
              <Button variant='secondary' href='/register'>
                Register
              </Button>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Intro;

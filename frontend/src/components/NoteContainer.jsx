import { Container, Row, Col } from 'react-bootstrap';

const NoteContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={10} className='p-2 align-items-center card bg-light'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

// <Container className='d-flex p-1 mt-3 justify-content-center'>   
// <Card className='d-flex p-2 align-items-center hero-card bg-light w-100'> 

{/* <Container className='d-flex justify-content-center'>
  <Card className='p-3 d-flex flex-column align-items-center hero-card bg-light w-75'>  */}


export default NoteContainer;
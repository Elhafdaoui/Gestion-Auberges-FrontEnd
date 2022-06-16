import React from 'react';
import {Navbar,Container} from 'react-bootstrap';

const Welcome = (props) => {
  
    return (
  <Navbar bg="dark" variant="dark" style={{height:"70px"}} >
    <Container className='d-flex' style={{marginTop:"10px"}}>
      
      <Navbar.Brand >
      <span style={{fontWeight:"bolder",fontSize:"1.7rem"}}>{props.name}</span>
      </Navbar.Brand>

      <p className='text-xl-right mt-3' > 
        <span className='Welcome'>{props.nom} à l'auberge </span>
      </p>

    </Container>
  </Navbar>
    );
};

export default Welcome;
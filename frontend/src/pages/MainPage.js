import React from 'react';

import PageTitle from '../components/PageTitle';
import MainLogin from '../components/MainLogin';
import { Container, Row, Col } from 'react-bootstrap';
import ps4 from '../ps4Transparent.png';
import xbox from '../xboxTransparent.png';
import switchPic from '../switchTransparent.png';
import Card from 'react-bootstrap/Card';

//import {withRouter} from 'react-router-dom';

//this is the main page of the site
//should display multiple clickable consoles that then display popular games
//PageTitle is a component that displays the title of the page

const MainPage = () =>
{

    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    console.log(currentUrl);
    console.log(currentPath);

    return(
      <div>
        
        
        <PageTitle />
        
        {/*alert("did we get here!")}*/}
        <MainLogin />

   

          <Container className="gamePics">
          <Row className="rows">
            <Col className="columns">
              <Card 
              style={{width:'18rem',
              height:'350px'}}
              className="mb-2"
              >
                <a href="https://google.com" target="_blank" rel="noreferrer">
                <Card.Img variant="top" src={ps4}/>
                </a>
                <Card.Body>
                  <Card.Title> PlayStation 4 Games</Card.Title>
                  <Card.Text>Check out some PlayStation 4 games!</Card.Text>
                </Card.Body>
                
              </Card>
            </Col>

             <Col className="columns">
              <Card
              style={{width:'18rem',
              height:'350px'}}
              className="mb-2"
              >
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <Card.Img variant='top' src={xbox}/>
            </a>
              <Card.Body>
                <Card.Title>Xbox One</Card.Title>
                <Card.Text>Check out some Xbox One games!</Card.Text>
              </Card.Body>
            
            </Card>
            </Col> 
          </Row>
          
          <Row>
            <Col></Col>
            <Col className="columns">
              <Card
              style={{width:'18rem',
              height:'350px'}}
              className="mb-2"
              >
                <a href="https://google.com" target="_blank" rel="noreferrer">
                  <Card.Img variant='top' src={switchPic}/>
                </a>
                  <Card.Body>
                    <Card.Title>Nintendo Switch</Card.Title>
                    <Card.Text>Check out some Nintendo Switch games!</Card.Text>
                  </Card.Body>
                  
                
              </Card>
            </Col>
            <Col></Col>
          </Row> 
        </Container>
        
        
        
        
        
      </div>
    );
};

export default MainPage;




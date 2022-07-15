import React from 'react';

import PageTitle from '../components/PageTitle';
import MainLogin from '../components/MainLogin';
import { Container, Row, Col } from 'react-bootstrap';
import ps4 from '../ps4Pic.png';
import xbox from '../xboxOnepic.png';
import switchPic from '../switchPic.png';

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
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <img src={ps4} className='logo' alt="ps4"/>
            </a>
            </Col>

            <Col className="columns">
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <img src={xbox} className='logo' alt="xbox"/>
            </a>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          <Col className="columns">
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <img src={switchPic} className='logo' alt="switch"/>
            </a>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        
      </div>
    );
};

export default MainPage;

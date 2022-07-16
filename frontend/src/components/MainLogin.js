import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoggedInName from '../components/LoggedInName';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import gamelogo from '../newgamelogo.png';
import '../components/MainLogin.css';





function MainLogin()
{
   

    let gimmie = localStorage.getItem('user_data');
    let gimmieMoar = JSON.parse(gimmie);
    let dynamicMain;
    
    

    if(gimmieMoar)
    {
        
        dynamicMain = 
        <div> 
        <span id="inner-title"></span><br />
        <p>you ARE already logged in! Your login is: {gimmieMoar.userName}</p>
        <LoggedInName />
        </div>
        
    }
    else
    {
        
        dynamicMain = 
        <div>
            
            <Navbar  expand="lg">
                
                    <Container className='imgWrapper'>
                        <a href="https://google.com" target="_blank" rel="noreferrer">
                        <img src={gamelogo} className='logo' alt="game logo"/>
                        </a>
                    </Container>
                    <Container className='loginWrapper'>
                        <Navbar.Brand></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="loginButtons">
                            
                                    <ModalComponent
                                        buttonType ={"Login"}
                                        title={"Login"}
                                        body={""}
                                        componentType={LoginModal}
                                    />
                            
                                <Navbar.Text style={{marginLeft: '.5rem'}}>{''}</Navbar.Text>
                                    <ModalComponent
                                        buttonType ={"Register"}
                                        title={"Register"}
                                        body={""}
                                        componentType={RegisterModal}
                                    />
                            
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        
    }


    return(

        <div>
            {dynamicMain}
        </div>
    );
}

export default MainLogin;

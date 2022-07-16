import React from 'react';
import { Nav , Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar {
        background-color: black;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: black;

        &:hover {
            color: white;
        }
    }
`;


export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">Game List</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse> 
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href='/'>Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href='/games'>Games</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href='/'>Register</Nav.Link></Nav.Item>
                </Nav>
        </Navbar>
    </Styles>
)
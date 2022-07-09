import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React from 'react';

function RegisterModal()
{
    return(
        <Form>
            <Form.Group className ="mb-3" controlid="topInput">
                <FloatingLabel label = "First Name">
                    <Form.Control type = "text" placeholder="firstName" autoFocus/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className ="mb-3" controlid="bottomInput">
                <FloatingLabel label = "Last Name">
                    <Form.Control type = "text" placeholder="lastName"/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className ="mb-3" controlid="bottomInput">
                <FloatingLabel label = "E-mail">
                    <Form.Control type = "text" placeholder="eMail"/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className ="mb-3" controlid="topInput">
                <FloatingLabel label = "Username">
                    <Form.Control type = "text" placeholder="userName"/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className ="mb-3" controlid="bottomInput">
                <FloatingLabel label = "Password">
                    <Form.Control type = "password" placeholder="password"/>
                </FloatingLabel>
            </Form.Group>
        </Form>
    );
} 


export default RegisterModal;


import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const LoginModal = () =>
{

    const [field, setField] = useState([{
        id: 1,
        userName: '',
        password: ''
    }])

    return(
        <Form>
            <Form.Group className ="mb-3" controlid="topInput">
                <FloatingLabel label = "Username">
                    <Form.Control type = "text" placeholder="username" autoFocus/>
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


export default LoginModal;


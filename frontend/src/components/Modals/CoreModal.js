//import { useState } from 'react';

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';



// function InfoModal()
// {
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return(
//         <p>ayyy</p>
//     );
// }

class CoreModal extends Component 
{
    render()
    {

        return (
            <div>
                <Modal show={this.props.show} onHide={() => {this.props.onHide({msg: 'we exited da modal'}); console.log("ayy");}}>
                    <Modal.Header>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.body}
                        {this.props.bodyCore}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onClick({msg: 'Modal Closed!'})}>Close</Button>
                        <Button variant="primary" onClick={() => {this.props.onClick({msg: 'Modal Sumbitted'}); console.log("baeee");}}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };
}

export default CoreModal;
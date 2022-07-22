import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class GameShowModal extends Component
{

    constructor(props)
    {
        super(props);
        this.state =
        {
            show: this.props.show,
        };
    }
    
    

    handleShow = () =>{


        this.setState({
            show: true,
        });
        
    };

    handleClose = (fromModal) => {
        //alert(fromModal.msg);
        this.setState({
            show: false
        });
    };

    render()
    {
        

        return(
            <div>
                 <Modal show={this.props.show} onHide={() => {this.handleClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      
                       hello
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.handleClose()}}>Close</Button>
                        <Button variant="primary" onClick={() => {alert("soon")}}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default GameShowModal;
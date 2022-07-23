import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

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
                 <Modal show={this.state.show} onHide={() => {this.handleClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.rowData.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className ="mb-3" controlid="formPlatforms">
                                platforms: {this.props.rowData.platforms}
                            </Form.Group>
                            <Form.Group className ="mb-3" controlid="formGenres">
                                genres: {this.props.rowData.genre}
                            </Form.Group>
                      </Form>
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
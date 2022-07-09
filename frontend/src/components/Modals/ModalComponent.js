import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import CoreModal from './CoreModal';


class ModalComponent extends Component
{

    constructor(props)
    {
        super(props);
        this.state =
        {
            show: false,
        };
    }

    handleShow = () =>{


        this.setState({
            show: true,
        });
        
    };

    handleClose = (fromModal) => {
        alert(fromModal.msg);
        this.setState({
            show: false
        });
    };

    render()
    {

        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    {this.props.buttonType}
                </Button>

                <CoreModal
                    show={this.state.show}
                    title={this.props.title}
                    body={this.props.body}
                    bodyCore = {this.props.bodyModal}
                    //data={this.state.data}
                    onClick={this.handleClose}
                    onHide={this.handleClose}/>
            </div>
        );
    }
}

export default ModalComponent;
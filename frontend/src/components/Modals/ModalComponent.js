import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import LoginModal from './LoginModal';
import CoreModal from './LoginModal';


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
        //alert(fromModal.msg);
        this.setState({
            show: false
        });
    };

    render()
    {
        const MyComponent = this.props.componentType;

        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    {this.props.buttonType}
                </Button>

                <MyComponent
                    show={this.state.show}
                    title={this.props.title}
                    body={this.props.body}
                    //bodyCore = {this.props.bodyModal}
                    //data={this.state.data}
                    onClick={this.handleClose}
                    onHide={this.handleClose}/>
            </div>
        );
    }
}

export default ModalComponent;
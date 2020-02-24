import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        
        const newItem = this.state.name
        const singleItem = newItem.split(',');
        
        for (let i = 0; i < singleItem.length; i++) {
            const cItem = {name: singleItem[i]};
            
            // Add item via addItem action
            this.props.addItem(cItem);  
        };

        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                { this.props.isAuthenticated ? 
                <button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Artikel hinzufügen</button> : <h4 className="mb-3 ml-4">Du kannst den Einkaufszettel nur bearbeiten wenn du angemeldet bist.</h4>                
                }

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Artikel zur Einkaufliste hinzufügen</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Artikel</Label>
                                <Input 
                                    type="text" 
                                    name="name" 
                                    id="item" 
                                    placeholder="neuer Artikel" 
                                    onChange={this.onChange}
                                    autoFocus="true"
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Artikel eintragen</Button>

                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
import React, { Component } from 'react';
import {
  Alert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import Axios from 'axios';

export default class TestFlightForm extends Component {
  constructor(props) {
    super(props);
    this.state = { showSuccess: false, showDanger: false };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(eventData) {
    const target = eventData.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  onSubmit(eventData) {
    eventData.preventDefault();
    Axios.post('http://localhost:3001/mailinglist', {
      customerName: this.state.customerName,
      email: this.state.email,
      phone: this.state.phone,
      budget: this.state.budget
    })
      .then(res => {
        this.setState({ showSuccess: true, showDanger: false });
      })
      .catch(err => {
        this.setState({ showSuccess: false, showDanger: true });
      });
  }

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Schedule a Test Flight</CardTitle>
            <CardSubtitle>No pilot's license required!</CardSubtitle>
            <CardText>
              Fill out form fields below to schedule test flight
            </CardText>
            <Form>
              <FormGroup>
                <Input
                  type='text'
                  onChange={this.onInputChange}
                  name='customerName'
                  id='customerName'
                  placeholder='What is your name?'
                />
              </FormGroup>
              <br />
              <FormGroup>
                <Input
                  type='text'
                  onChange={this.onInputChange}
                  name='customerPhone'
                  id='customerPhone'
                  placeholder='What is your contact number?'
                />
              </FormGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType='prepend'>@</InputGroupAddon>
                <Input
                  type='text'
                  onChange={this.onInputChange}
                  name='email'
                  id='email'
                  placeholder='What is your email address?'
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType='prepend'>$</InputGroupAddon>
                <Input
                  type='text'
                  onChange={this.onInputChange}
                  name='budget'
                  id='budget'
                  placeholder='Do you have a budget you need to stay under?'
                />
              </InputGroup>
              <br />
            </Form>
            <br />
            <Button onClick={this.onSubmit}>Submit</Button>

            <Alert isOpen={this.state.showSuccess} color='success'>
              Your data was submitted successfully! Your test fligth awaits!
            </Alert>
            <Alert isOpen={this.state.showDanger} color='danger'>
              Something went horribly wrong!
            </Alert>
          </CardBody>
        </Card>
      </div>
    );
  }
}

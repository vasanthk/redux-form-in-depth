/**
 * Sample redux form v6
 */

// Setting it up
import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// Form component - connected to redux
class ReduxFormTutorial extends Component {
  //our other functions will go here
  render() {
    return (
      <div>
        //our form will go here
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(form(ReduxFormTutorial));

// Defining your form
const form = reduxForm({
  form: 'ReduxFormTutorial'
});

// Handling field/validation - Now a separate stateless fn component
const renderField = (field) => (
  <div>
    <label>{field.input.label}</label>
    <input {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

// Redux form passes decorates the component with various props - eg. handleSubmit
const { handleSubmit } = this.props;

// Handling form submission
const handleFormSubmit = (formProps) => {
  // Call the action that is used to submit the form along with the props required passed to it.
  this.props.submitFormAction(formProps);
};

// Inside the form component
return (
  <div>
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

      <Field name="firstName" type="text" component={renderField} label="First Name"/>
      <Field name="lastName" type="text" component={renderField} label="Last Name"/>

      <button action="submit">Save changes</button>
    </form>
  </div>
);

// Initializing form data
componentDidMount() {
  this.handleInitialize();
}

handleInitialize = () => {
  const initData = {
    "firstName": this.props.currentUser.firstName,
    "lastName": this.props.currentUser.lastName,
  };

  this.props.initialize(initData);
};

// Adding form validations
function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }
  return errors;
}

// Pass it to redux form
const form = reduxForm({
  form: 'ReduxFormTutorial',
  validate
});

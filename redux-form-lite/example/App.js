import React, { Component } from 'react';
import reduxFormLite from '../reduxFormLite';

/**
 * VALIDATE AND ONSUBMIT FOR FORM
 */

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const onSubmit = values => {
  alert('values: ' + JSON.stringify(values, null, 4));
};

/**
 * FORM COMPONENT
 */

class SignUpForm extends Component {
  render() {
    const {fields: {firstName, lastName, email}, handleSubmit, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className={'form-group' + (firstName.touched && firstName.error ? ' has-danger' : '')}>
          <label>First Name</label>
          <input type="text" className="form-control" placeholder="First Name" {...firstName} value=""/>
          {firstName.touched && firstName.error && <span className="text-help">{firstName.error}</span>}
        </div>
        <div className={'form-group' + (lastName.touched && lastName.error ? ' has-danger' : '')}>
          <label>Last Name</label>
          <input type="text" className="form-control" placeholder="Last Name" {...lastName}/>
          {lastName.touched && lastName.error && <span className="text-help">{lastName.error}</span>}
        </div>
        <div className={'form-group' + (email.touched && email.error ? ' has-danger' : '')}>
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Email" {...email}/>
          {email.touched && email.error && <span className="text-help">{email.error}</span>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>Sign up</button>
      </form>
    );
  }
}

// TODO: Modify signature to use currying similar to redux-form
const SignUpFormContainer = reduxFormLite({
  form: 'signUpForm',
  fields: ['firstName', 'lastName', 'email'],
  handleSubmit: onSubmit,
  validate
})(SignUpForm);

/**
 * APP COMPONENT
 */

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <SignUpFormContainer/>
      </div>
    );
  }
}
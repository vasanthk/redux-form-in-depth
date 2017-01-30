/**
 * Redux form 4.2.0
 * Code samples and notes
 *
 * redux-form primarily consists of two things:
 *    - a Redux reducer
 *        The reducer listens to dispatched actions from the component to maintain your state in Redux.
 *    - a React component decorator.
 *        The reduxForm() decorator decorates a component to enable it as a form.
 *        This will create two nested Higher Order Components (HOCs) that will wrap your component:
 *          - ReduxFormConnector connects to Redux
 *          - ReduxForm handles all the dispatching and provides information to your component.
 */

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class ContactForm extends Component {
  render() {
    const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName}/>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName}/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ContactForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields: ['firstName', 'lastName', 'email'] // all the fields in your form
})(ContactForm);

export default ContactForm;

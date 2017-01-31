/**
 * The recommended way to do server-side validation with redux-form is to return a rejected promise
 * from the onSubmit function. There are two ways to give redux-form a function to run when your form
 * is submitted:
 *  - Pass it as an onSubmit prop to your decorated component.
 *    In which case, you would use onClick={this.props.handleSubmit} inside your decorated component to cause
 *    it to fire when the submit button is clicked.
 *  - Pass it as a parameter to the this.props.handleSubmit function from inside your decorated component.
 *    In which case, you would use onClick={this.props.handleSubmit(mySubmit)} inside your decorated component
 *    to cause it to fire when the submit button is clicked.
 */

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { show as showResults } from '../redux/modules/submission';
export const fields = ['username', 'password'];

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
        reject({username: 'User does not exist', _error: 'Login failed!'});
      } else if (values.password !== 'redux-form') {
        reject({password: 'Wrong password', _error: 'Login failed!'});
      } else {
        dispatch(showResults(values));
        resolve();
      }
    }, 1000); // simulate server latency
  })
};

class SubmitValidationForm extends Component {
  render() {
    const { fields: { username, password }, error, resetForm, handleSubmit, submitting } = this.props;
    return (<form onSubmit={handleSubmit(submit)}>
        <div>
          <label>Username</label>
          <div>
            <input type="text" placeholder="Username" {...username}/>
          </div>
          {username.touched && username.error && <div>{username.error}</div>}
        </div>
        <div>
          <label>Password</label>
          <div>
            <input type="password" placeholder="Password" {...password}/>
          </div>
          {password.touched && password.error && <div>{password.error}</div>}
        </div>
        {error && <div>{error}</div>}
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Log In
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

SubmitValidationForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'submitValidation',
  fields
  // onSubmit can be used to pass the fn to the decorated component from outside.
})(SubmitValidationForm)
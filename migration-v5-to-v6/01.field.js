/**
 * In v5
 */

import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

class MyForm extends Component {
  render() {
    const { fields: { username, password }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <div>
            <input type="text" {...username}/>
            {username.touched &&
            username.error &&
            <span className="error">{username.error}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input type="password" {...password}/>
            {password.touched &&
            password.error &&
            <span className="error">{password.error}</span>}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'myForm',
  fields: ['username', 'password']
})(MyForm)

/**
 * In v6
 */

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form' // imported Field

const renderInput = field =>   // Define stateless component to render input and errors
  <div>
    <input {...field.input} type={field.type}/>
    {field.meta.touched &&
    field.meta.error &&
    <span className="error">{field.meta.error}</span>}
  </div>;

class MyForm extends Component {
  render() {

    const { handleSubmit } = this.props       // No fields prop

    return (
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">Username</label>
          <Field
            name="username"                   // Specify field name
            component={renderInput}           // Specify render component above
            type="text"/>
          // "type" prop passed to renderInput
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field
            name="password"                   // Specify field name
            component={renderInput}           // Reuse same render component
            type="password"/>
          // "type" prop passed to renderInput
        </div>

        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'myForm'
  // no fields array given
})(MyForm)
/**
 * Sometimes you may want to have your Submit button outside of your decorated redux-form component.
 * redux-form exposes a submit() method on the decorated component, allowing you to accomplish this.
 * All you need to do is add a ref prop to your component, and then access it via
 * this.refs.whateverRefYouGaveIt. Calling submit() from outside the form component is exactly
 * the same as calling it from inside, e.g. it won't call your onSubmit handler if there are
 * validation errors, etc.
 */


import React, { Component, PropTypes } from 'react'
import { reset } from 'redux-form'     // reset action creator exported by redux-form
import { connect } from 'react-redux'  // needed to bind reset action creator to dispatch
import SubmitFromParentForm from './common/submit-from-parent-form.js'

class SubmitFromParentContainer extends Component {
  constructor(props) {
    super(props);
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  handleSubmit() {
    this.refs.myForm.submit();  // will return a promise
  }

  resetForm() {
    this.props.reset('submitFromParent'); // pass form name to bound action creator
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <div className="form-horizontal">
        <SubmitFromParentForm ref="myForm" onSubmit={onSubmit}/>
        <div className="text-center">
          <button type="button" className="btn btn-primary btn-lg" style={{ margin: 10 }} onClick={this.handleSubmit}>
            <i className="fa fa-paper-plane"/>
            Submit
          </button>
          <button type="button" className="btn btn-default btn-lg" style={{ margin: 10 }} onClick={this.resetForm}>
            Clear Values
          </button>
        </div>
      </div>
    )
  }
}

SubmitFromParentContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,  // shows a dialog box
  reset: PropTypes.func.isRequired      // reset action bound to dispatch
};

export default connect(undefined, {reset})(SubmitFromParentContainer)
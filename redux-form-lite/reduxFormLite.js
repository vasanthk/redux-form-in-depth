/**
 * Redux Form Lite
 * Light weight version of Redux form
 */

import React, { PropTypes, Compoent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import deepEqual from 'deep-equal';
import { setField, initialize, touchAll } from "./actions";
import { simplifiedValues, createField, hasSyncErrors } from "./helpers";

// HOC for nested forms
export default function reduxFormLite(Wrapped, options) {
  const {
    form = '',
    fields: initFields = [],
    getInitialState,
    validate = () => {
    }
    } = options;

  class ReduxFormLite extends Component {
    constructor(props) {
      super(props);
      this.state = {
        model: null
      };
      this.onFieldChange = this.onFieldChange.bind(this);
      this.validate = this.validate.bind(this);
    }

    componentWillMount() {
      this.createFields(this.props.fields); // Create all fields
      this.setModel(); // Set current state of HOC
    }

    componentDidMount() {
      // Client side initialization
      let initialState = getInitialState && getInitialState(this.props);
      if (!initialState) {
        initialState = {};
      }
      const state = this.props.currentForm;
      const initialized = state && state.initialized ? state.initialized : false;
      // Initialize form only if state object is not empty
      if (!initialized && Object.keys(initialState).length > 0) {
        this.props.actions.initialize(form, this.props.fields, initialState);
        this.setModel();
      }
    }

    componentWillReceiveProps(nextProps) {
      // If new props modifies the fields in the form - create fields again
      if (!deepEqual(this.props.currentForm, nextProps.currentForm)) {
        const currentFields = Object.keys(this.fields);
        if (!deepEqual(currentFields, nextProps.fields)) {
          this.createFields(nextProps.fields); // create all fields
        }
        this.setModel(nextProps.currentForm); // set current state of form
      }

      // If form has not been initialized - initialize it.
      const state = this.props.currentForm;
      const initialized = state && state.initialized ? state.initialized : false;
      if (!initialized) {
        const initialState = getInitialState && getInitialState(nextProps);
        if (initialState) {
          this.props.actions.initialize(form, this.props.fields, initialState);
        }
      }
    }

    componentWillUnmount() {
      this.fields = null;
    }

    onFieldChange(field, value) {
      this.props.actions.setField(form, field, value);
    }

    setModel(newState) {
      const fieldsKeys = Object.keys(this.fields);
      this.values = simplifiedValues(fieldsKeys, newState);

      // Second argument in validate fn can be used for dynamic validation.
      const errors = validate(this.values, this.props);
      fieldsKeys.forEach(field => {
        const { fields, values } = this;
        fields[field].value = values[field];
        fields[field].error = errors && errors[field] ? errors[field] : undefined;
        fields[field].touched = newState && newState[field] ? newState[field].touched : false;
      });
      this.fields = {...this.fields};
      this.allValid = !hasSyncErrors(errors);
      this.setState({model: newState});
    }

    // validate() needs to be triggered before every submit.
    validate() {
      this.props.actions.touchAll(form, this.props.fields);
      return this.allValid;
    }

    // Create all fields
    createFields(fieldList) {
      const formFields = fieldList.reduce((fields, field) => ({
        ...fields,
        [field]: createField(field, this.onFieldChange)
      }), {});
      this.fields = {...formFields};
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          fields={this.fields}
          allValid={this.allValid}
          values={this.values}
          validate={this.validate}
        />);
    }
  }

  ReduxFormLite.propTypes = {
    fields: PropTypes.array,
    actions: PropTypes.object,
    currentForm: PropTypes.object
  };
  ReduxFormLite.defaultProps = {
    fields: initFields // Take either from the Decorator or else as props
  };

  // Connecting the form store via react-redux connect()
  function mapStateToProps(state) {
    return {
      currentForm: state.forms[form]
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        setField,
        initialize,
        touchAll
      }, dispatch),
      dispatch
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(ReduxFormLite);
}

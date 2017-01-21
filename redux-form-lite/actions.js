import {INITIALIZE, DESTROY, SET_FIELD, TOUCH_ALL} from './actionTypes';

export function initialize(form, fields, initialValue) {
  return {
    type: INITIALIZE,
    form,
    fields,
    initialValue
  }
}

export function setField(form, field, value) {
  return {
    type: SET_FIELD,
    form,
    field,
    value
  }
}

export function touchAll(form, fields) {
  return {
    type: TOUCH_ALL,
    form,
    fields
  }
}

export function destroy(form) {
  return {
    type: DESTROY,
    form
  };
}

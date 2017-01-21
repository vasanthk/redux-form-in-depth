import {INITIALIZE, DESTROY, SET_FIELD, TOUCH_ALL} from './actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
    {
      // NOTE: Use blocks {} when using const in switch case
      // Reference: http://stackoverflow.com/a/35746467/1672655
      const {form, fields, initialValue} = action;
      return {
        ...state,
        [form]: {
          ...fields.reduce((accumulator, currField) => ({
            ...accumulator,
            [currField]: {
              value: initialValue[currField]
            }
          }), {}),
          initialized: true
        }
      };
    }
    case DESTROY:
    {
      const updateDeleteState = {...state};
      delete updateDeleteState[action.form];
      return {
        ...updateDeleteState
      };
    }
    case SET_FIELD:
    {
      const {form, field, value} = action;
      return {
        ...state,
        [form]: {
          ...state[form],
          [field]: {
            value,
            touched: true
          }
        }
      };
    }
    case TOUCH_ALL:
    {
      const {form, fields} = action;
      return {
        ...state,
        [form]: {
          ...state[form],
          ...fields.reduce((accumulator, currField) => ({
            ...accumulator,
            [currField]: {
              value: state[form] && state[form][currField] ? state[form][currField].value : '',
              touched: true
            }
          }), {})
        }
      }
    }
    default:
      return state;
  }
}
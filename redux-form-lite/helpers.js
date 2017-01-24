/**
 * Helper functions for Redux form lite.
 */

export function getFieldValue(field, formValues) {
  if (formValues && formValues[field]) {
    return formValues[field].value;
  }
  return undefined;
}

export function simplifiedValues(fields, formValues) {
  return fields.reduce((acc, field) => ({
    ...acc,
    [field]: getFieldValue(field, formValues)
  }), {});
}

export function createField(field, onChange) {
  const fieldObject = {
    name: field,
    touched: false,
    onChange: ({ target: { type, checked, value } }) => {
      const isCheckbox = type && type.toLowerCase() === 'checkbox';
      onChange(field, isCheckbox ? checked : value);
    }
  };
  return {
    ...fieldObject,
    setValue(value) { // If component sets value directly
      onChange(field, value);
    }
  };
}
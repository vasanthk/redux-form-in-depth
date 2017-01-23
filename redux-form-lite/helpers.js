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
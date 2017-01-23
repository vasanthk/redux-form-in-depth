/**
 * Helper functions for Redux form lite.
 */

export function getFieldValue(field, formValues) {
  if (formValues && formValues[field]) {
    return formValues[field].value;
  }
  return undefined;
}
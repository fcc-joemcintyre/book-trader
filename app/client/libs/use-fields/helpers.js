// @ts-check
/**
 * Create a field object to include in createFields array
 * @param {string} name Field name (will be property name in field object)
 * @param {any} initial Initial field value, will be converted by formatIn / formatOut functions
 * @param {boolean} required Is field required (default false)
 * @param {function[]} validators Array of validation functions to apply to this field
 * @param {function} formatOut Function to transform value out of field
 * @return {Object} Individual field object
 */
export function createField (name, initial = '', required = false, validators = [], formatOut = null) {
  return {
    name,
    initial,
    required,
    validators,
    formatOut,
    value: initial,
    touched: false,
    error: null,
  };
}

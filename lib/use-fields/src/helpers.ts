/* eslint-disable import/no-unresolved */
import { Field, FieldValue, FormatOutFn, ValidatorFn } from './index.js';

/**
 * Create a field object to include in createFields array
 * @param name Field name (will be property name in field object)
 * @param initial Initial field value, will be converted by formatIn / formatOut functions
 * @param required Is field required (default false)
 * @param validators Array of validation functions to apply to this field
 * @param formatOut Function to transform value out of field
 * @returns Individual field object
 */
export function createField (
  name: string,
  initial: FieldValue = '',
  required = false,
  validators: ValidatorFn[] = [],
  formatOut?: FormatOutFn
): Field {
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

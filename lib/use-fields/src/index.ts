/* eslint-disable import/no-unresolved */
import { createField } from './helpers.js';
import {
  inDate, inInteger, inIntegerArray, outBoolean, outDate, outDateISO, outDateString, outInteger,
  outIntegerArray, outString, outStringArray, outTrim, outTrimArray,
} from './formatters.js';
import { useFields } from './useFields.js';

export type FieldValue = boolean | number | string | Date | boolean[] | number[] | string[] | Date[] | null;
export type ValidatorFn = (value: FieldValue) => string | null;
export type FormatOutFn = (value: FieldValue) => FieldValue;

export type Field = {
  name: string,
  initial: FieldValue,
  value: FieldValue,
  required: boolean,
  validators: ValidatorFn[],
  formatOut?: FormatOutFn,
  error: string | null,
  touched: boolean,
};

export type FieldError = {
  name: string,
  error: string | null,
};
export type CrossFieldValidatorFn = (field: Field, fields: Record<string, Field>) => FieldError[];

export {
  createField, inDate, inInteger, inIntegerArray, outBoolean, outDate, outDateISO, outDateString, outInteger,
  outIntegerArray, outString, outStringArray, outTrim, outTrimArray, useFields,
};

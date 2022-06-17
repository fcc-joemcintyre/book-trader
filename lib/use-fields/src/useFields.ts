/* eslint-disable import/no-unresolved */
import { ChangeEvent, FocusEvent, useCallback, useReducer } from 'react';
import { Field, FieldError, FieldValue, CrossFieldValidatorFn } from './index.js';
import { FieldAction, init, reducer } from './useFieldsReducer.js';

/**
  useFields hook
  @param initialFields Array of initial fields
  @param validators Array of validators
  @returns Hook data (fields) and operations
 */
export const useFields = (
  initialFields: Field[],
  validators: CrossFieldValidatorFn[] = []
) => {
  const [fields, dispatch] = useReducer (reducer, initialFields, init);

  const setFields = useCallback ((data: Field[]) => {
    dispatch ({ type: FieldAction.SET, fields: init (data) });
  }, [dispatch]);

  const onChange = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name && fields[name]) {
      const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
      dispatch ({ type: FieldAction.VALUE, name: e.target.name, value });
    }
  }, [dispatch, fields]);

  const onValidate = useCallback ((e: FocusEvent<HTMLInputElement>) => {
    const name = e.target && e.target.name;
    if (name && fields[name]) {
      const errors = validate (fields[name], fields, validators);
      const changes = errors.filter ((a) => a.error !== fields[a.name].error);
      if (changes.length !== 0) {
        dispatch ({ type: FieldAction.ERRORS, errors });
      }
      dispatch ({ type: FieldAction.TOUCHED, name, touched: true });
    }
  }, [dispatch, fields, validators]);

  const getValues = useCallback (() => {
    const result: Record<string, FieldValue> = {};
    for (const key of Object.keys (fields)) {
      if (Array.isArray (fields[key])) {
        for (const a of [fields[key]]) {
          result[a.name] = a.formatOut ? a.formatOut (a.value) : a.value;
        }
      } else {
        const a = fields[key];
        result[key] = a.formatOut ? a.formatOut (a.value) : a.value;
      }
    }
    return result;
  }, [fields]);

  const setValue = useCallback ((name: string, value: string | boolean) => {
    dispatch ({ type: FieldAction.VALUE, name, value });
  }, [dispatch]);

  const setRequired = useCallback ((name: string, required: boolean) => {
    dispatch ({ type: FieldAction.REQUIRED, name, required });
  }, [dispatch]);

  const validateAll = useCallback (() => {
    const errors: FieldError[] = [];
    for (const key of Object.keys (fields)) {
      const t1 = validate (fields[key], fields, validators);
      for (const a of t1) {
        const t2 = errors.find ((b) => b.name === a.name);
        if (t2) {
          t2.error = t2.error || a.error;
        } else {
          errors.push (a);
        }
      }
    }
    dispatch ({ type: FieldAction.ERRORS, errors });
    const list = errors.filter ((a) => a.error !== null);
    return list.length > 0 ? list : null;
  }, [fields, dispatch, validators]);

  const addField = useCallback ((field: Field) => {
    dispatch ({ type: FieldAction.ADDFIELD, field });
  }, [dispatch]);

  const removeField = useCallback ((name: string) => {
    dispatch ({ type: FieldAction.REMOVEFIELD, name });
  }, [dispatch]);

  return {
    fields,
    setFields,
    onChange,
    onValidate,
    getValues,
    setValue,
    setRequired,
    validateAll,
    addField,
    removeField,
  };
};

/**
 * Validate field content
 * @param field Field to validate
 * @param fields Object containing all fields
 * @param validators Validators
 * @returns Array of errors found
 */
function validate (
  field: Field,
  fields: Record<string, Field>,
  validators: CrossFieldValidatorFn[]
) {
  const errors: FieldError[] = [];
  if (validators.length > 0) {
    for (const fn of validators) {
      const list = fn (field, fields);
      for (const a of list) {
        const t = errors.find ((b) => b.name === a.name);
        if (t) {
          t.error = t.error ? t.error : a.error;
        } else {
          errors.push (a);
        }
      }
    }
    for (const a of errors) {
      const t = validateField (fields[a.name]);
      if (t) {
        a.error = t;
      }
    }
  }
  if (!errors.find ((a) => a.name === field.name)) {
    errors.push ({ name: field.name, error: validateField (field) });
  }
  return errors;
}

/**
 * @param field Field to validate
 * @returns Error string, or null if no error
 */
function validateField (field: Field): string | null {
  const content = hasContent (field.value);
  if (!field.required && !content) {
    return null;
  }
  if (field.required && !content) {
    return 'required';
  }

  let error = null;
  if (field.validators && (field.validators.length > 0)) {
    const value = field.formatOut ? field.formatOut (field.value) : field.value;
    for (let c = 0; c < field.validators.length; c += 1) {
      error = field.validators[c] (value);
      if (error) { break; }
    }
  }
  return error;
}

/**
 * Does field have any content
 * @param value Value to check
 * @returns true if it has content, false if not. Return Boolean(value) for unknown types.
 */
function hasContent (
  value: FieldValue | null
): boolean {
  if (typeof value === 'string') {
    return value.trim () !== '';
  } else if (Array.isArray (value)) {
    return value.length !== 0;
  } else if (typeof value === 'number') {
    return !Number.isNaN (value);
  } else {
    return Boolean (value);
  }
}

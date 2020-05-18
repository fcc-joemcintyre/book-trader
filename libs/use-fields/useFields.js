// @ts-check
import { useCallback, useReducer } from 'react';
import { reducer, init } from './useFieldsReducer';

/**
  useFields hook
  @param {Object[]} initialFields Array of initial fields
  @param {function[]} validators Array of validators
  @returns {Object} Hook data (fields) and operations
 */
export const useFields = (initialFields, validators = []) => {
  const [fields, dispatch] = useReducer (reducer, initialFields, init);

  const setFields = useCallback ((data) => {
    dispatch ({ type: 'set', data: init (data) });
  }, [dispatch]);

  const onChange = useCallback ((e) => {
    const name = e.target.name;
    if (name && fields[name]) {
      const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
      dispatch ({ type: 'value', name: e.target.name, value });
    }
  }, [dispatch, fields]);

  const onValidate = useCallback ((e) => {
    const name = e.target && e.target.name;
    if (name && fields[name]) {
      const errors = validate (fields[name], fields, validators);
      const changes = errors.filter (a => a.error !== fields[a.name].error);
      if (changes.length !== 0) {
        dispatch ({ type: 'errors', errors });
      }
      dispatch ({ type: 'touched', name });
    }
  }, [dispatch, fields]);

  const getValues = useCallback (() => {
    const result = {};
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

  const setValue = useCallback ((name, value) => {
    dispatch ({ type: 'value', name, value });
  }, [dispatch, fields]);

  const setRequired = useCallback ((name, value) => {
    dispatch ({ type: 'required', name, value });
  }, [dispatch]);

  const validateAll = useCallback (() => {
    const errors = [];
    for (const key of Object.keys (fields)) {
      const t1 = validate (fields[key], fields, validators);
      for (const a of t1) {
        const t2 = errors.find (b => b.name === a.name);
        if (t2) {
          t2.error = t2.error || a.error;
        } else {
          errors.push (a);
        }
      }
    }
    dispatch ({ type: 'errors', errors });
    const list = errors.filter (a => a.error !== null);
    return list.length > 0 ? list : null;
  }, [fields, dispatch]);

  const addField = useCallback ((field) => {
    dispatch ({ type: 'addfield', field });
  }, [dispatch]);

  const removeField = useCallback ((field) => {
    dispatch ({ type: 'removefield', field });
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
 * @param {Object} field Field to validate
 * @param {Object[]} fields All fields
 * @param {function[]} validators Validators
 * @return {Object[]} Array of errors found
 */
function validate (field, fields, validators) {
  const errors = [];
  if (validators.length > 0) {
    for (const fn of validators) {
      const list = fn (field, fields);
      for (const a of list) {
        const t = errors.find (b => b.name === a.name);
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
  if (!errors.find (a => a.name === field.name)) {
    errors.push ({ name: field.name, error: validateField (field) });
  }
  return errors;
}

/**
 * @param {Object} field Field to validate
 * @return {string | null} Error string, or null if no error
 */
function validateField (field) {
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
 * @param {Object} value Value to check
 * @returns {boolean} true if it has content, false if not. Default true for unknown types.
 */
function hasContent (value) {
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

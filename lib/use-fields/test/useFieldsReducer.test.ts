import { expect } from 'earljs';
import { init, reducer } from '../lib/useFieldsReducer.js';
import { createField } from '../lib/helpers.js';

// enum mirror
const FieldAction = {
  VALUE: 0,
  REQUIRED: 1,
  ERROR: 2,
  ERRORS: 3,
  TOUCHED: 4,
  SET: 5,
  ADDFIELD: 6,
  REMOVEFIELD: 7,
};

const field1 = createField ('field1', 'A');
const field2 = createField ('field2', 'B');
const base = init ([field1, field2]);

describe ('reducer', function () {
  it ('Verify initial base objects', () => {
    expect (base).toEqual ({
      field1: {
        name: 'field1',
        initial: 'A',
        required: false,
        validators: [],
        formatOut: undefined,
        value: 'A',
        touched: false,
        error: null,
      },
      field2: {
        name: 'field2',
        initial: 'B',
        required: false,
        validators: [],
        formatOut: undefined,
        value: 'B',
        touched: false,
        error: null,
      },
    });
  });

  it ('reducer: set value', () => {
    const action = { type: FieldAction.VALUE, name: 'field2', value: 'C' };
    expect (reducer (base, action)).toEqual ({
      field1: {
        ...field1,
      },
      field2: {
        ...field2,
        value: 'C',
      },
    });
  });

  it ('reducer: set required (true)', () => {
    const action = { type: FieldAction.REQUIRED, name: 'field2', required: true };
    expect (reducer (base, action)).toEqual ({
      field1: {
        ...field1,
      },
      field2: {
        ...field2,
        required: true,
      },
    });
  });

  it ('reducer: set required (false)', () => {
    const action = { type: FieldAction.REQUIRED, name: 'field2', required: false };
    expect (reducer (base, action)).toEqual ({
      field1: {
        ...field1,
      },
      field2: {
        ...field2,
        required: false,
      },
    });
  });

  it ('reducer: set single field error', () => {
    const action = { type: FieldAction.ERROR, name: 'field2', error: 'required' };
    expect (reducer (base, action)).toEqual ({
      field1: {
        ...field1,
      },
      field2: {
        ...field2,
        error: 'required',
      },
    });
  });

  it ('reducer: set multiple field errors', () => {
    const action = {
      type: FieldAction.ERRORS,
      errors: [
        { name: 'field1', error: 'error1' },
        { name: 'field2', error: 'error2' },
      ],
    };
    expect (reducer (base, action)).toEqual ({
      field1: {
        ...field1,
        error: 'error1',
      },
      field2: {
        ...field2,
        error: 'error2',
      },
    });
  });

  it ('reducer: set single touched', () => {
    const action = { type: FieldAction.TOUCHED, name: 'field2', touched: true };
    expect (reducer (base, action)).toEqual ({
      field1: {
        ...field1,
      },
      field2: {
        ...field2,
        touched: true,
      },
    });
  });

  it ('reducer: replace fields', () => {
    const field3 = createField ('field3', 'C');
    const field4 = createField ('field4', 'D');

    const action = { type: FieldAction.SET, fields: init ([field3, field4]) };
    expect (reducer (base, action)).toEqual ({
      field3: {
        ...field3,
      },
      field4: {
        ...field4,
      },
    });
  });

  it ('reducer: add field', () => {
    const field3 = createField ('field3', 'C');

    const action = { type: FieldAction.ADDFIELD, field: field3 };
    expect (reducer (base, action)).toEqual ({
      field1: {
        ...field1,
      },
      field2: {
        ...field2,
      },
      field3: {
        ...field3,
      },
    });
  });

  it ('reducer: remove field', () => {
    const action = { type: FieldAction.REMOVEFIELD, name: field1.name };
    expect (reducer (base, action)).toEqual ({
      field2: {
        ...field2,
      },
    });
  });

  it ('reducer: remove field that does not exist makes no changes', () => {
    const action = { type: FieldAction.REMOVEFIELD, name: 'notafield' };
    expect (reducer (base, action)).toEqual (base);
  });
});

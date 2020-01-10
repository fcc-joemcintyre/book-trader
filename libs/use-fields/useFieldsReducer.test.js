/* eslint-env jest */
import { init, reducer } from './useFieldsReducer';

test ('init: simple fields, no helper', () => {
  const result = init ([
    { name: 'field1', initial: 'A' },
    { name: 'field2', initial: 'B' },
  ]);

  expect (result).toEqual ({
    field1: {
      name: 'field1',
      initial: 'A',
      required: false,
      validators: [],
      formatOut: null,
      value: 'A',
      touched: false,
      error: null,
    },
    field2: {
      name: 'field2',
      initial: 'B',
      required: false,
      validators: [],
      formatOut: null,
      value: 'B',
      touched: false,
      error: null,
    },
  });
});

const base = init ([
  { name: 'field1', initial: 'A' },
  { name: 'field2', initial: 'B' },
]);

test ('reducer: set value', () => {
  expect (reducer (base, { type: 'value', name: 'field1', value: 'C' })).toEqual ({
    field1: {
      name: 'field1',
      initial: 'A',
      required: false,
      validators: [],
      formatOut: null,
      value: 'C',
      touched: false,
      error: null,
    },
    field2: {
      name: 'field2',
      initial: 'B',
      required: false,
      validators: [],
      formatOut: null,
      value: 'B',
      touched: false,
      error: null,
    },
  });
});

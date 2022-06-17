/* eslint-disable import/no-unresolved */
import { Field, FieldError } from './index.js';

type State = Record<string, Field>;

// eslint-disable-next-line no-shadow
export enum FieldAction {
  VALUE = 0, REQUIRED, ERROR, ERRORS, TOUCHED, SET, ADDFIELD, REMOVEFIELD
};

type Action =
  { type: FieldAction.VALUE, name: string, value: string | boolean } |
  { type: FieldAction.REQUIRED, name: string, required: boolean } |
  { type: FieldAction.ERROR, name: string, error: string | null } |
  { type: FieldAction.ERRORS, errors: FieldError[] } |
  { type: FieldAction.TOUCHED, name: string, touched: boolean } |
  { type: FieldAction.SET, fields: State } |
  { type: FieldAction.ADDFIELD, field: Field } |
  { type: FieldAction.REMOVEFIELD, name: string };

/**
  Reducer for field object
  @param state Incoming state
  @param action Action to perform and data
  @returns Next state
 */
export function reducer (state: State, action: Action): State {
  switch (action.type) {
    case FieldAction.VALUE:
      return { ...state, [action.name]: { ...state[action.name], value: action.value } };

    case FieldAction.REQUIRED:
      return { ...state, [action.name]: { ...state[action.name], required: action.required } };

    case FieldAction.ERROR:
      return { ...state, [action.name]: { ...state[action.name], error: action.error } };

    case FieldAction.ERRORS: {
      const update = { ...state };
      for (const a of action.errors) {
        update[a.name] = { ...state[a.name], error: a.error };
      }
      return update;
    }

    case FieldAction.TOUCHED:
      return { ...state, [action.name]: { ...state[action.name], touched: action.touched } };

    case FieldAction.SET:
      return action.fields;

    case FieldAction.ADDFIELD:
      return ({ ...state, [action.field.name]: action.field });

    case FieldAction.REMOVEFIELD: {
      let newState = state;
      if (action.name) {
        newState = {};
        for (const n of Object.keys (state)) {
          if (n !== action.name) {
            newState[n] = state[n];
          }
        }
      }
      return newState;
    }

    default:
      return state;
  }
}

/**
  Create fields object from array of individual fields
  @param initial Initial array of fields (may be created with createField)
  @returns Fields as an Object
 */
export function init (initial: Field[]) {
  const defaultField = {
    name: 'invalid',
    initial: '',
    value: '',
    required: false,
    validators: [],
    formatOut: undefined,
    touched: false,
    error: null,
  };

  return initial.reduce ((acc: State, a) => {
    acc[a.name] = { ...defaultField, ...a, value: a.initial };
    return acc;
  }, {});
}

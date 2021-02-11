// @ts-check
/**
  Reducer for field object
  @param {Object} state Incoming state
  @param {Object} action Action to perform and data
  @returns {Object} Next state
 */
export function reducer (state, action) {
  switch (action.type) {
    case 'value':
      return { ...state, [action.name]: { ...state[action.name], value: action.value } };

    case 'required':
      return { ...state, [action.name]: { ...state[action.name], required: action.value } };

    case 'error':
      return { ...state, [action.name]: { ...state[action.name], error: action.error } };

    case 'errors': {
      const update = { ...state };
      for (const a of action.errors) {
        update[a.name] = { ...state[a.name], error: a.error };
      }
      return update;
    }

    case 'touched':
      return (state[action.name].touched ?
        state :
        { ...state, [action.name]: { ...state[action.name], touched: true } }
      );

    case 'set':
      return action.data;

      case 'addfield':
        return ({ ...state, [action.field.name]: action.field });
  
      case 'removefield': {
        let newState = state;
        if (action.field) {
          newState = {};
          for (const n of Object.keys (state)) {
            if (n !== action.field) {
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
  @param {Object[]} initial Initial array of fields (may be created with createField)
  @return {Object} Fields as an Object
*/
export function init (initial) {
  const defaultField = {
    name: 'invalid',
    initial: '',
    required: false,
    validators: [],
    formatOut: null,
    touched: false,
    error: null,
  };

  return initial.reduce ((acc, a) => {
    acc[a.name] = { ...defaultField, ...a, value: a.initial };
    return acc;
  }, {});
}

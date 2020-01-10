import PropTypes from 'prop-types';

/**
 * PropType for fields passed into forms
 */
export const fieldPropTypes = {
  name: PropTypes.string.isRequired,
  initial: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  required: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  formatOut: PropTypes.PropTypes.func,
  errors: PropTypes.string,
  touched: PropTypes.bool.isRequired,
};

/**
 * PropType for field arrays passed into forms
 */
export const fieldArrayPropTypes = {
  name: PropTypes.string.isRequired,
  initial: PropTypes.arrayOf (PropTypes.any).isRequired,
  value: PropTypes.arrayOf (PropTypes.any).isRequired,
  required: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  formatOut: PropTypes.func,
  errors: PropTypes.string,
  touched: PropTypes.bool.isRequired,
};

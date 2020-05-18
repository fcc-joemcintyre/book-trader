// @ts-check
/**
 * Convert field string to string
 * @param {string | number | boolean} value Field string
 * @return {string} String
 */
export function outString (value = '') {
  return value === null ? '' : typeof value === 'string' ? value : value.toString ();
}

/**
 * Convert array of field strings to strings
 * @param {any[]} value Field values
 * @return {string[]} Array of strings
 */
export function outStringArray (value = []) {
  return Array.isArray (value) ? value.map (outString) : [];
}

/**
 * Convert field string to trimmed string, by trimming leading/trailing spaces
 * @param {string } value Field string
 * @return {string} Trimmed string
 */
export function outTrim (value = '') {
  return outString (value).trim ();
}

/**
 * Convert array of field strings to strings
 * @param {any[]} value Field values
 * @return {string[]} Array of strings
 */
export function outTrimArray (value = []) {
  return Array.isArray (value) ? value.map (outTrim) : [];
}

/**
 * Convert date to field string. Accepts Date object or date string.
 * @param {string | Date} value Input date
 * @return {string} Date in m/d/yyyy format, or '' if no valid date provided
 */
export function inDate (value = '') {
  if (value === null) {
    return '';
  }
  const date = new Date (value);
  return (!Number.isNaN (date.getTime ()) ? `${date.getMonth () + 1}/${date.getDate ()}/${date.getFullYear ()}` : '');
}

/**
 * Convert input date string to Date object.
 * @param {string | Date} value Input date (mm/dd/yyyy) or Date object
 * @return {Date} Date object, or null if no valid date provided
 */
function parseDate (value) {
  if (Object.prototype.toString.call (value) === '[object Date]') {
    const date = new Date (value);
    return (!Number.isNaN (date.getTime ()) ? date : null);
  }
  if (typeof value === 'string') {
    const parts = value.split (/\D/);
    if (parts.length === 3) {
      const y = Number (parts[2]);
      const m = Number (parts[0]);
      const d = Number (parts[1]);
      if (y > 0 && m > 0 && d > 0) {
        const date = new Date (y, m - 1, d);
        if (!Number.isNaN (date.getTime ())) {
          return date;
        }
      }
    }
  }
  return null;
}

/**
 * Convert field string to Date
 * @param {string} value Date string
 * @return {string | Date} Date object, or '' if field is empty
 */
export function outDate (value = '') {
  return parseDate (value) || '';
}

/**
 * Convert field string to date string ('YYYY-MM-DD')
 * @param {string} value Date string
 * @return {string} Date as a string ('YYYY-MM-DD'), or '' if field is empty
 */
export function outDateString (value = '') {
  const date = parseDate (value);
  if (date) {
    const month = date.getMonth () + 1;
    const day = date.getDate ();
    return `${date.getFullYear ()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }
  return '';
}

/**
 * Convert field string to ISO date string
 * @param {string} value Date string
 * @return {string} ISO date string, or '' if field is empty
 */
export function outDateISO (value = '') {
  const date = parseDate (value);
  return date ? date.toISOString () : '';
}

/**
 * Validate and return integer value for a value
 * @param {number | string} value Value to convert
 * @return {number} Integer value
 */
function integer (value) {
  let n;
  if (typeof value === 'number') {
    n = value;
  } else if (typeof value === 'string') {
    const period = value.indexOf ('.');
    const t1 = (period === -1) ? value : value.substr (0, period);
    n = Number (t1.replace (/[^0-9]/g, ''));
  } else {
    n = 0;
  }
  n = Math.floor (n);
  return n;
}

/**
 * Integer input value
 * @param {string | number} value Input value
 * @return {number} Validated integer
 */
export function inInteger (value = 0) {
  return integer (value);
}

/**
 * Convert field string to integer
 * @param {string | number} value Field string
 * @return {number} Integer
 */
export function outInteger (value = 0) {
  return integer (value);
}

/**
 * Array of integers input value
 * @param {any[]} value Input values
 * @return {number[]} Array of field integers
 */
export function inIntegerArray (value = []) {
  return Array.isArray (value) ? value.map (inInteger) : [];
}

/**
 * Convert array of field strings to integers
 * @param {any[]} value Input values
 * @return {number[]} Array of integers
 */
export function outIntegerArray (value = []) {
  return Array.isArray (value) ? value.map (outInteger) : [];
}

/**
 * Convert field value to boolean value
 * @param {string | boolean} value Date string
 * @return {boolean} Boolean value
 */
export function outBoolean (value = false) {
  return (value === true || value === 'true');
}

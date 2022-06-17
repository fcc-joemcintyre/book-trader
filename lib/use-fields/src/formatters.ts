/**
 * Convert field string to string
 * @param value Field value
 * @returns Value as string
 */
export function outString (value: string | number | boolean = '') {
  return value === null ? '' : typeof value === 'string' ? value : value.toString ();
}

/**
 * Convert array of field values to strings
 * @param value Field values
 * @returns Array of values as strings
 */
export function outStringArray (value: (string | number | boolean)[] = []) {
  return Array.isArray (value) ? value.map (outString) : [];
}

/**
 * Convert field string to trimmed string, by trimming leading/trailing spaces
 * @param value Field value string
 * @returns Trimmed string
 */
export function outTrim (value = '') {
  return outString (value).trim ();
}

/**
 * Convert array of field strings to strings
 * @param value Field values
 * @returns Array of values as trimmed strings
 */
export function outTrimArray (value: string[] = []) {
  return Array.isArray (value) ? value.map (outTrim) : [];
}

/**
 * Convert date to field string. Accepts Date object or date string.
 * @param value Input date
 * @returns Date in m/d/yyyy format, or '' if no valid date provided
 */
export function inDate (value: string | Date = ''): string {
  if (value === null) {
    return '';
  }
  const date = new Date (value);
  return (!Number.isNaN (date.getTime ()) ? `${date.getMonth () + 1}/${date.getDate ()}/${date.getFullYear ()}` : '');
}

/**
 * Convert input date string to Date object.
 * @param value Input date (mm/dd/yyyy) or Date object
 * @returns Date object, or null if no valid date provided
 */
function parseDate (value: string): Date | null {
  if (value) {
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
 * @param value Date string
 * @returns Date object, or '' if field is empty
 */
export function outDate (value = ''): string | Date {
  return parseDate (value) || '';
}

/**
 * Convert field string to date string ('YYYY-MM-DD')
 * @param value Date string
 * @returns Date as a string ('YYYY-MM-DD'), or '' if field is empty
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
 * @param value Date string
 * @returns ISO date string, or '' if field is empty
 */
export function outDateISO (value = '') {
  const date = parseDate (value);
  return date ? date.toISOString () : '';
}

/**
 * Validate and return integer value for a value
 * @param value Value to convert
 * @returns Integer value
 */
function integer (value: number | string): number {
  let n = 0;
  if (typeof value === 'number') {
    n = value;
  } else if (typeof value === 'string') {
    const period = value.indexOf ('.');
    const t1 = (period === -1) ? value : value.substr (0, period);
    n = Number (t1.replace (/[^0-9]/g, ''));
  }
  n = Math.floor (n);
  return n;
}

/**
 * Integer input value
 * @param value Input value
 * @returns Validated integer
 */
export function inInteger (value: string | number = 0) {
  return integer (value);
}

/**
 * Convert field string to integer
 * @param value Field string
 * @returns Integer
 */
export function outInteger (value: string | number = 0) {
  return integer (value);
}

/**
 * Array of integers input value
 * @param value Input values
 * @returns Array of field integers
 */
export function inIntegerArray (value: (string | number)[] = []) {
  return Array.isArray (value) ? value.map (inInteger) : [];
}

/**
 * Convert array of field strings to integers
 * @param value Input values
 * @returns Array of integers
 */
export function outIntegerArray (value: (string | number)[] = []) {
  return Array.isArray (value) ? value.map (outInteger) : [];
}

/**
 * Convert field value to boolean value
 * @param value Field value
 * @returns Boolean value
 */
export function outBoolean (value: string | boolean = false) {
  return (value === true || value === 'true');
}

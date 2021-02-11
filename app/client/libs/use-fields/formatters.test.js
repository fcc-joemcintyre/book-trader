/* eslint-env jest */
// @ts-check
import {
  inDate, inInteger, inIntegerArray, outBoolean, outDate, outDateISO, outDateString, outInteger,
  outIntegerArray, outString, outStringArray, outTrim, outTrimArray,
} from './formatters.js';

test ('outString no leading or trailing spaces', () => {
  expect (outString ('test string')).toEqual ('test string');
});

test ('outString leading spaces', () => {
  expect (outString ('  test string')).toEqual ('  test string');
});

test ('outString trailing spaces', () => {
  expect (outString ('test string  ')).toEqual ('test string  ');
});

test ('outString leading and trailing spaces', () => {
  expect (outString ('  test string  ')).toEqual ('  test string  ');
});

test ('outString with number', () => {
  expect (outString (12345)).toEqual ('12345');
});

test ('outString with boolean true', () => {
  expect (outString (true)).toEqual ('true');
});

test ('outString with boolean false', () => {
  expect (outString (false)).toEqual ('false');
});

test ('outString null', () => {
  expect (outString (null)).toEqual ('');
});

test ('outString no parameters', () => {
  expect (outString ()).toEqual ('');
});

test ('outStringArray with 2 elements', () => {
  expect (outStringArray (['A', 'B'])).toEqual (['A', 'B']);
});

test ('outStringArray null', () => {
  expect (outStringArray (null)).toEqual ([]);
});

test ('outStringArray no parameters', () => {
  expect (outStringArray ()).toEqual ([]);
});

test ('outTrim no leading or trailing spaces', () => {
  expect (outTrim ('test string')).toEqual ('test string');
});

test ('outTrim leading spaces', () => {
  expect (outTrim ('  test string')).toEqual ('test string');
});

test ('outTrim trailing spaces', () => {
  expect (outTrim ('test string  ')).toEqual ('test string');
});

test ('outTrim leading and trailing spaces', () => {
  expect (outTrim ('  test string  ')).toEqual ('test string');
});

test ('outTrim with number', () => {
  // @ts-ignore (test bad value)
  expect (outTrim (12345)).toEqual ('12345');
});

test ('outTrim with boolean true', () => {
  // @ts-ignore (test bad value)
  expect (outTrim (true)).toEqual ('true');
});

test ('outTrim with boolean false', () => {
  // @ts-ignore (test bad value)
  expect (outTrim (false)).toEqual ('false');
});

test ('outTrim null', () => {
  expect (outTrim (null)).toEqual ('');
});

test ('outTrim no parameters', () => {
  expect (outTrim ()).toEqual ('');
});

test ('outTrimArray with 2 elements', () => {
  expect (outTrimArray ([' A  ', '  B '])).toEqual (['A', 'B']);
});

test ('outTrimArray null', () => {
  expect (outTrimArray (null)).toEqual ([]);
});

test ('outTrimArray no parameters', () => {
  expect (outTrimArray ()).toEqual ([]);
});

test ('inInteger 0 as a number', () => {
  expect (inInteger (0)).toEqual (0);
});

test ('inInteger 1234 as a number', () => {
  expect (inInteger (1234)).toEqual (1234);
});

test ('inInteger 123.45 as a number', () => {
  expect (inInteger (123.45)).toEqual (123);
});

test ('inInteger 0 as a string', () => {
  expect (inInteger ('0')).toEqual (0);
});

test ('inInteger 1234 as a string', () => {
  expect (inInteger ('1234')).toEqual (1234);
});

test ('inInteger 123.45 as a string', () => {
  expect (inInteger ('123.45')).toEqual (123);
});

test ('inInteger $12,345.67 as a string', () => {
  expect (inInteger ('$12,345.67')).toEqual (12345);
});

test ('inInteger no parameters', () => {
  expect (inInteger ()).toEqual (0);
});

test ('inInteger null', () => {
  expect (inInteger (null)).toEqual (0);
});

test ('inIntegerArray', () => {
  expect (inIntegerArray ([1, 2, 3])).toEqual ([1, 2, 3]);
});

test ('inIntegerArray null', () => {
  expect (inIntegerArray (null)).toEqual ([]);
});

test ('inIntegerArray no parameters', () => {
  expect (inIntegerArray ()).toEqual ([]);
});

test ('outInteger 0', () => {
  expect (outInteger ('0')).toEqual (0);
});

test ('outInteger 1234', () => {
  expect (outInteger ('1234')).toEqual (1234);
});

test ('outInteger 123.45', () => {
  expect (outInteger ('123.45')).toEqual (123);
});

test ('outInteger $12,345.67', () => {
  expect (outInteger ('$12,345.67')).toEqual (12345);
});

test ('outInteger null', () => {
  expect (outInteger (null)).toEqual (0);
});

test ('outInteger no parameters', () => {
  expect (outInteger ()).toEqual (0);
});

test ('outIntegerArray', () => {
  expect (outIntegerArray ([1, 2, 3])).toEqual ([1, 2, 3]);
});

test ('outIntegerArray null', () => {
  expect (outIntegerArray (null)).toEqual ([]);
});

test ('outIntegerArray no parameters', () => {
  expect (outIntegerArray ()).toEqual ([]);
});

test ('inDate date as a Date', () => {
  const date = new Date (2019, 0, 10);
  expect (inDate (date)).toEqual ('1/10/2019');
});

test ('inDate date as a string (m/d/y)', () => {
  expect (inDate ('2/20/2019')).toEqual ('2/20/2019');
});

test ('inDate date as a string (y/m/d)', () => {
  expect (inDate ('2019/2/20')).toEqual ('2/20/2019');
});

test ('inDate empty string', () => {
  expect (inDate ('')).toEqual ('');
});

test ('inDate no parameters', () => {
  expect (inDate ()).toEqual ('');
});

test ('inDate null', () => {
  expect (inDate (null)).toEqual ('');
});

test ('outDate valid dates', () => {
  const date1 = new Date (2019, 0, 1);
  const date2 = new Date (2019, 11, 31);

  expect (outDate ('1/1/2019')).toEqual (date1);
  expect (outDate ('12/31/2019')).toEqual (date2);
});

test ('outDate invalid dates', () => {
  expect (outDate ('/2/2019')).toEqual ('');
  expect (outDate ('2//2019')).toEqual ('');
  expect (outDate ('2/2/')).toEqual ('');
  expect (outDate ('2s/2')).toEqual ('');
  expect (outDate ('2/2/2222222222')).toEqual ('');
});

test ('outDate incomplete date', () => {
  expect (outDate ('2/2')).toEqual ('');
});

test ('outDate empty string', () => {
  expect (outDate ('')).toEqual ('');
});

test ('outDate null', () => {
  expect (outDate (null)).toEqual ('');
});

test ('outDate no parameters', () => {
  expect (outDate ()).toEqual ('');
});

test ('outDateString valid dates', () => {
  expect (outDateString ('1/1/2019')).toEqual ('2019-01-01');
  expect (outDateString ('12/31/2019')).toEqual ('2019-12-31');
});

test ('outDateString incomplete date', () => {
  expect (outDateString ('2/2')).toEqual ('');
});

test ('outDateString null', () => {
  expect (outDateString (null)).toEqual ('');
});

test ('outDateString no parameters', () => {
  expect (outDateString ()).toEqual ('');
});

test ('outDateISO', () => {
  const offset = new Date ('2019-02-20').getTimezoneOffset ();
  const hour = `0${offset / 60}`;
  expect (outDateISO ('2/20/2019')).toEqual (`2019-02-20T${hour}:00:00.000Z`);
});

test ('outDateISO incomplete date', () => {
  expect (outDateISO ('2/2')).toEqual ('');
});

test ('outDateISO null', () => {
  expect (outDateISO (null)).toEqual ('');
});

test ('outDateISO no parameters', () => {
  expect (outDateISO ()).toEqual ('');
});

test ('outBoolean (true) should be true', () => {
  expect (outBoolean (true)).toEqual (true);
});

test ('outBoolean (string true) should be true', () => {
  expect (outBoolean ('true')).toEqual (true);
});

test ('outBoolean (false) should be false', () => {
  expect (outBoolean (false)).toEqual (false);
});

test ('outBoolean (string false) should be false', () => {
  expect (outBoolean ('false')).toEqual (false);
});

test ('outBoolean null', () => {
  expect (outBoolean (null)).toEqual (false);
});

test ('outDate no parameters', () => {
  expect (outBoolean ()).toEqual (false);
});

test ('outDate smpty string', () => {
  expect (outBoolean ('')).toEqual (false);
});

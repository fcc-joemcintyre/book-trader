import { expect } from 'earljs';
import {
  inDate, inInteger, inIntegerArray, outBoolean, outDate, outDateISO, outDateString, outInteger,
  outIntegerArray, outString, outStringArray, outTrim, outTrimArray,
} from '../lib/formatters.js';

describe ('formatters', function () {
  it ('outString no leading or trailing spaces', () => {
    expect (outString ('test string')).toEqual ('test string');
  });

  it ('outString leading spaces', () => {
    expect (outString ('  test string')).toEqual ('  test string');
  });

  it ('outString trailing spaces', () => {
    expect (outString ('test string  ')).toEqual ('test string  ');
  });

  it ('outString leading and trailing spaces', () => {
    expect (outString ('  test string  ')).toEqual ('  test string  ');
  });

  it ('outString with number', () => {
    expect (outString (12345)).toEqual ('12345');
  });

  it ('outString with boolean true', () => {
    expect (outString (true)).toEqual ('true');
  });

  it ('outString with boolean false', () => {
    expect (outString (false)).toEqual ('false');
  });

  it ('outString undefined', () => {
    expect (outString ()).toEqual ('');
  });

  it ('outString no parameters', () => {
    expect (outString ()).toEqual ('');
  });

  it ('outStringArray with 2 elements', () => {
    expect (outStringArray (['A', 'B'])).toEqual (['A', 'B']);
  });

  it ('outStringArray undefined', () => {
    expect (outStringArray ()).toEqual ([]);
  });

  it ('outStringArray no parameters', () => {
    expect (outStringArray ()).toEqual ([]);
  });

  it ('outTrim no leading or trailing spaces', () => {
    expect (outTrim ('test string')).toEqual ('test string');
  });

  it ('outTrim leading spaces', () => {
    expect (outTrim ('  test string')).toEqual ('test string');
  });

  it ('outTrim trailing spaces', () => {
    expect (outTrim ('test string  ')).toEqual ('test string');
  });

  it ('outTrim leading and trailing spaces', () => {
    expect (outTrim ('  test string  ')).toEqual ('test string');
  });

  it ('outTrim undefined', () => {
    expect (outTrim ()).toEqual ('');
  });

  it ('outTrim no parameters', () => {
    expect (outTrim ()).toEqual ('');
  });

  it ('outTrimArray with 2 elements', () => {
    expect (outTrimArray ([' A  ', '  B '])).toEqual (['A', 'B']);
  });

  it ('outTrimArray undefined', () => {
    expect (outTrimArray ()).toEqual ([]);
  });

  it ('outTrimArray no parameters', () => {
    expect (outTrimArray ()).toEqual ([]);
  });

  it ('inInteger 0 as a number', () => {
    expect (inInteger (0)).toEqual (0);
  });

  it ('inInteger 1234 as a number', () => {
    expect (inInteger (1234)).toEqual (1234);
  });

  it ('inInteger 123.45 as a number', () => {
    expect (inInteger (123.45)).toEqual (123);
  });

  it ('inInteger 0 as a string', () => {
    expect (inInteger ('0')).toEqual (0);
  });

  it ('inInteger 1234 as a string', () => {
    expect (inInteger ('1234')).toEqual (1234);
  });

  it ('inInteger 123.45 as a string', () => {
    expect (inInteger ('123.45')).toEqual (123);
  });

  it ('inInteger $12,345.67 as a string', () => {
    expect (inInteger ('$12,345.67')).toEqual (12345);
  });

  it ('inInteger no parameters', () => {
    expect (inInteger ()).toEqual (0);
  });

  it ('inInteger undefined', () => {
    expect (inInteger ()).toEqual (0);
  });

  it ('inIntegerArray', () => {
    expect (inIntegerArray ([1, 2, 3])).toEqual ([1, 2, 3]);
  });

  it ('inIntegerArray undefined', () => {
    expect (inIntegerArray ()).toEqual ([]);
  });

  it ('inIntegerArray no parameters', () => {
    expect (inIntegerArray ()).toEqual ([]);
  });

  it ('outInteger 0', () => {
    expect (outInteger ('0')).toEqual (0);
  });

  it ('outInteger 1234', () => {
    expect (outInteger ('1234')).toEqual (1234);
  });

  it ('outInteger 123.45', () => {
    expect (outInteger ('123.45')).toEqual (123);
  });

  it ('outInteger $12,345.67', () => {
    expect (outInteger ('$12,345.67')).toEqual (12345);
  });

  it ('outInteger undefined', () => {
    expect (outInteger ()).toEqual (0);
  });

  it ('outInteger no parameters', () => {
    expect (outInteger ()).toEqual (0);
  });

  it ('outIntegerArray', () => {
    expect (outIntegerArray ([1, 2, 3])).toEqual ([1, 2, 3]);
  });

  it ('outIntegerArray undefined', () => {
    expect (outIntegerArray ()).toEqual ([]);
  });

  it ('outIntegerArray no parameters', () => {
    expect (outIntegerArray ()).toEqual ([]);
  });

  it ('inDate date as a Date', () => {
    const date = new Date (2019, 0, 10);
    expect (inDate (date)).toEqual ('1/10/2019');
  });

  it ('inDate date as a string (m/d/y)', () => {
    expect (inDate ('2/20/2019')).toEqual ('2/20/2019');
  });

  it ('inDate date as a string (y/m/d)', () => {
    expect (inDate ('2019/2/20')).toEqual ('2/20/2019');
  });

  it ('inDate empty string', () => {
    expect (inDate ('')).toEqual ('');
  });

  it ('inDate no parameters', () => {
    expect (inDate ()).toEqual ('');
  });

  it ('inDate undefined', () => {
    expect (inDate ()).toEqual ('');
  });

  it ('outDate valid dates', () => {
    const date1 = new Date (2019, 0, 1);
    const date2 = new Date (2019, 11, 31);

    expect (outDate ('1/1/2019')).toEqual (date1);
    expect (outDate ('12/31/2019')).toEqual (date2);
  });

  it ('outDate invalid dates', () => {
    expect (outDate ('/2/2019')).toEqual ('');
    expect (outDate ('2//2019')).toEqual ('');
    expect (outDate ('2/2/')).toEqual ('');
    expect (outDate ('2s/2')).toEqual ('');
    expect (outDate ('2/2/2222222222')).toEqual ('');
  });

  it ('outDate incomplete date', () => {
    expect (outDate ('2/2')).toEqual ('');
  });

  it ('outDate empty string', () => {
    expect (outDate ('')).toEqual ('');
  });

  it ('outDate undefined', () => {
    expect (outDate ()).toEqual ('');
  });

  it ('outDate no parameters', () => {
    expect (outDate ()).toEqual ('');
  });

  it ('outDateString valid dates', () => {
    expect (outDateString ('1/1/2019')).toEqual ('2019-01-01');
    expect (outDateString ('12/31/2019')).toEqual ('2019-12-31');
  });

  it ('outDateString incomplete date', () => {
    expect (outDateString ('2/2')).toEqual ('');
  });

  it ('outDateString defined', () => {
    expect (outDateString ()).toEqual ('');
  });

  it ('outDateString no parameters', () => {
    expect (outDateString ()).toEqual ('');
  });

  it ('outDateISO', () => {
    const offset = new Date ('2019-02-20').getTimezoneOffset ();
    const hour = `0${offset / 60}`;
    expect (outDateISO ('2/20/2019')).toEqual (`2019-02-20T${hour}:00:00.000Z`);
  });

  it ('outDateISO incomplete date', () => {
    expect (outDateISO ('2/2')).toEqual ('');
  });

  it ('outDateISO undefined', () => {
    expect (outDateISO ()).toEqual ('');
  });

  it ('outDateISO no parameters', () => {
    expect (outDateISO ()).toEqual ('');
  });

  it ('outBoolean (true) should be true', () => {
    expect (outBoolean (true)).toEqual (true);
  });

  it ('outBoolean (string true) should be true', () => {
    expect (outBoolean ('true')).toEqual (true);
  });

  it ('outBoolean (false) should be false', () => {
    expect (outBoolean (false)).toEqual (false);
  });

  it ('outBoolean (string false) should be false', () => {
    expect (outBoolean ('false')).toEqual (false);
  });

  it ('outBoolean undefined', () => {
    expect (outBoolean ()).toEqual (false);
  });

  it ('outDate no parameters', () => {
    expect (outBoolean ()).toEqual (false);
  });

  it ('outDate smpty string', () => {
    expect (outBoolean ('')).toEqual (false);
  });
});

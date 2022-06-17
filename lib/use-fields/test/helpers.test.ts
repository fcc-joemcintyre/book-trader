import { expect } from 'earljs';
import { createField } from '../lib/helpers.js';

describe ('helpers', function () {
  it ('all defaults', () => {
    const t = createField ('name');
    expect (t.name).toEqual ('name');
    expect (t.initial).toEqual ('');
    expect (t.required).toEqual (false);
    expect (t.validators).toEqual ([]);
    expect (t.formatOut).toEqual (undefined);
    expect (t.value).toEqual ('');
    expect (t.touched).toEqual (false);
    expect (t.error).toEqual (null);
  });

  it ('no defaults', () => {
    const noop = () => null;
    const t = createField ('name', 'in', true, [noop, noop], noop);
    expect (t.name).toEqual ('name');
    expect (t.initial).toEqual ('in');
    expect (t.required).toEqual (true);
    expect (t.validators).toBeAnArrayOfLength (2);
    expect (t.validators[0]).toEqual (noop);
    expect (t.validators[1]).toEqual (noop);
    expect (t.formatOut).toEqual (noop);
    expect (t.value).toEqual ('in');
    expect (t.touched).toEqual (false);
    expect (t.error).toEqual (null);
  });
});

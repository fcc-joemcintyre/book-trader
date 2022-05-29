import { expect } from 'earljs';
import { isPassword } from '../src/isPassword.js';

describe ('isPassword', () => {
  it ('valid', () => {
    expect (isPassword ('abcdef')).toEqual (null);
  });

  it ('invalid length', () => {
    expect (isPassword ('abc')).toEqual ('length');
  });

  it ('invalid content', () => {
    expect (isPassword ('abc>def')).toEqual ('format');
  });
});

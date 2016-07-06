import React from 'react';
import {verifyLogin} from '../../account/store/actions';

export default class VerifyLogin extends React.Component {
  constructor (props, context) {
    super (props, context);
    context.store.dispatch (verifyLogin ()).then (() => {
      context.router.push ('/');
    });
  }
  render () {
    return null;
  }
}

VerifyLogin.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
}

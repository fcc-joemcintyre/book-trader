import React from 'react';
import {withRouter} from 'react-router';
import {verifyLogin} from '../../account/store/actions';

class VerifyLogin extends React.Component {
  constructor (props, context) {
    super (props, context);
    context.store.dispatch (verifyLogin ()).then (() => {
      props.router.push ('/');
    });
  }
  render () {
    return null;
  }
}

export default withRouter (VerifyLogin);

VerifyLogin.contextTypes = {
  store: React.PropTypes.object.isRequired
}

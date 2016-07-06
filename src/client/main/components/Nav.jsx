import React from 'react';
import {Link, IndexLink} from 'react-router';
import {logout} from '../../account/store/actions';

// Header with application and common navigation
export default class Nav extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    let appLinks = [];
    let titleLinks = [];

    appLinks.push (<li key='a1'><IndexLink to='/' activeClassName='active'>All</IndexLink></li>);
    if (this.props.loggedIn) {
      titleLinks.push (<li key='t1'
        onClick={() => {
          this.context.store.dispatch (logout ());
        }}>
        <Link to='/'>Logout</Link>
      </li>);
      appLinks.push (<li key='a2'><Link to='/requests' activeClassName='active'>Requests</Link></li>);
      appLinks.push (<li key='a3'><Link to='/manage' activeClassName='active'>Manage</Link></li>);
      appLinks.push (<li key='a4'><Link to='/profile' activeClassName='active'>Profile</Link></li>);
    } else {
      titleLinks.push (<li key='t2'><Link to='/register'>Register</Link></li>);
      titleLinks.push (<li key='t3'><Link to='/login'>Login</Link></li>);
    }
    appLinks.push (<li key='a5'><Link to='/about' activeClassName='active'>About</Link></li>);

    return (
      <div className='nav'>
        <div className='navTitle'>
          <h1>BookTrader</h1>
          <ul style={{float:'right'}}>
            {titleLinks}
          </ul>
        </div>
        <div className='navApp'>
          <ul style={{float:'left'}}>
            {appLinks}
          </ul>
        </div>
      </div>
    );
  }
}

Nav.contextTypes = {
  store: React.PropTypes.object.isRequired
};

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
};

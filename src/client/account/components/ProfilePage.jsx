import React from 'react';
import {Link} from 'react-router';
import {updateProfile} from '../store/actions';
import FilteredInput from '../../ui/FilteredInput.jsx';
import USStateSelect from '../../ui/USStateSelect.jsx';

const nameChars = /[A-Za-z -.,]/;

export default class ProfilePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = context.store.getState ().user;
    this.state.error = null;

    this.onSubmit = this.onSubmit.bind (this);
  }

  onSubmit (event) {
    event.preventDefault ();
    this.context.store.dispatch (updateProfile (this.state.name, this.state.city, this.state.state))
    .then (() => {
      this.context.router.push ('/');
    })
    .catch (() => {
      this.setState ({error: 'Error saving profile information'});
    });
  }

  render() {
    return (
      <div className='dialogProfile'>
        <h2>Profile</h2>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <FilteredInput id='name'
              autoFocus={true}
              type='text'
              value={this.state.name}
              maxLength={20}
              filter={nameChars}
              onChange={e => {
                this.setState ({name: e.target.value});
              }}/>
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <FilteredInput id='city'
              type='text'
              value={this.state.city}
              maxLength={20}
              filter={nameChars}
              onChange={e => {
                this.setState ({city: e.target.value});
              }}/>
          </div>
          <div>
            <label htmlFor='state'>State</label>
            <USStateSelect id='state'
              value={this.state.state}
              onChange={e => {
                this.setState ({state: e.target.value});
              }}/>
          </div>
          <button className='dialogButton'>Save</button>
        </form>
      </div>
    );
  }
}

ProfilePage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
}

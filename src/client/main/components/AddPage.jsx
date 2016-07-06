import React from 'react';
import {Link} from 'react-router';
import {addBook} from '../store/actions';
import FilteredInput from '../../ui/FilteredInput.jsx';

const textChars = /[ -~]/;

export default class AddPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      cover: '',
      category: '',
      title: '',
      author: '',
      error: false
    };
    this.save = this.save.bind (this);
  }

  save (event) {
    event.preventDefault ();
    if (! ((this.state.cover === '') || (this.state.title === '') || (this.state.category === '') || (this.state.author === ''))) {
      this.context.store.dispatch (addBook (this.state.category, this.state.title, this.state.author, this.state.cover))
      .then (success => {
        this.setState ({ error: false });
        this.context.router.push ('/manage');
      }).catch (error => {
        this.setState ({ error: true });
      });
    }
  }

  render() {
    return (
      <div className='dialogLabels'>
        <h2>Add Book</h2>
        <hr/>
        <div>
          <div>
            <label htmlFor='cover'>Cover (url)</label>
            <FilteredInput id='cover'
              className='textLong'
              autoFocus={true}
              type='text'
              maxLength={512}
              autoCapitalize='none'
              autoCorrect='off'
              value={this.state.cover}
              onChange={e => {
                this.setState ({cover: e.target.value});
              }}/>
          </div>
          <div>
            <label htmlFor='category'>Category</label>
            <FilteredInput id='category'
              type='text'
              maxLength={20}
              filter={textChars}
              value={this.state.category}
              onChange={e => {
                this.setState ({category: e.target.value});
              }}/>
          </div>
          <div>
            <label htmlFor='title'>Title</label>
            <FilteredInput id='title'
              className='textLong'
              type='text'
              maxLength={60}
              filter={textChars}
              value={this.state.title}
              onChange={e => {
                this.setState ({title: e.target.value});
              }}/>
          </div>
          <div>
            <label htmlFor='author'>Author</label>
            <FilteredInput id='author'
              type='text'
              maxLength={30}
              value={this.state.author}
              onChange={e => {
                this.setState ({author: e.target.value});
              }}/>
          </div>
          <button className='dialogButton'
            disabled={(this.state.cover === '') || (this.state.category === '')
              || (this.state.title === '') || (this.state.author === '')}
            onClick={this.save}>
            Add Book
          </button>
        </div>
      </div>
    );
  }
}

AddPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};

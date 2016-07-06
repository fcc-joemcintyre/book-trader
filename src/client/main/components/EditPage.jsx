import React from 'react';
import {Link} from 'react-router';
import {updateBook} from '../store/actions';
import {getBook} from '../store/books';
import FilteredInput from '../../ui/FilteredInput.jsx';

const textChars = /[ -~]/;

export default class EditPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let book = getBook (this.context.store.getState (), this.props.params._id);
    this.state = {
      _id: book._id,
      cover: book.cover,
      category: book.category,
      title: book.title,
      author: book.author,
      error: false
    };
    this.save = this.save.bind (this);
  }

  save (event) {
    event.preventDefault ();
    if (! ((this.state.cover === '') || (this.state.title === '') || (this.state.category === '') || (this.state.author === ''))) {
      this.context.store.dispatch (updateBook (this.state._id, this.state.category, this.state.title, this.state.author, this.state.cover))
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
        <h2>Edit Book</h2>
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
            Save
          </button>
        </div>
      </div>
    );
  }
}

EditPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};

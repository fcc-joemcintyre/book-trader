import React from 'react';
import {withRouter} from 'react-router';
import ManageBook from './ManageBook.jsx';
import {deleteBook} from '../store/actions';
import Masonry from 'react-masonry-component';

class ManagePage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let s = context.store.getState ();
    this.state = {
      id: s.user.id,
      books: s.books
    }
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      let s = this.context.store.getState ();
      this.setState ({books: s.books});
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    let items = [];
    items.push (
      <div key='0'
        className='addBook'
        onClick={() => {this.props.router.push ('/add')}}>
        <div className='addSign'>
          +
        </div>
        <h3>Add Book</h3>
      </div>
    );
    let books = this.state.books;
    for (let book of books) {
      if (book.ownerId === this.state.id) {
        items.push (
          <ManageBook key={book._id}
            book={book}
            handleEditBook={(bookId) => {this.props.router.push (`/edit/${bookId}`)}}
            handleDeleteBook={(bookId) => {this.context.store.dispatch (deleteBook (bookId))}}
          />
        );
      }
    }

    return (
      <div className='homePage'>
        <div className='items'>
          <Masonry elementType='div'>
            {items}
          </Masonry>
        </div>
      </div>
    );
  }
}

export default withRouter (ManagePage);

ManagePage.contextTypes = {
  store: React.PropTypes.object.isRequired
}

import React from 'react';
import {Link} from 'react-router';
import Book from './Book.jsx';
import {setBooks, createTradeRequest, deleteTradeRequest} from '../store/actions';
import Masonry from 'react-masonry-component';

export default class DisplayPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    let s = context.store.getState ();
    this.state = {
      books: s.books,
      user: s.user.id
    }
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      let s = this.context.store.getState ();
      this.setState ({
        books: s.books,
        user: s.user.id
      });
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    let topMessage;
    if (this.state.user === '') {
      topMessage = <p>Login to add books and trade with others.</p>
    }
    console.log (this.props.location);
    let includeBook;
    if (this.props.location.pathname.startsWith ('/books/owner')) {
      includeBook = (book) => {return (book.ownerId === this.props.params.id);}
    } else if (this.props.location.pathname.startsWith ('/books/category')) {
      includeBook = (book) => {return (book.category === this.props.params.category);}
    } else {
      includeBook = (book) => {return true;}
    }

    let items = [];
    let books = this.state.books;
    for (let book of books) {
      if (includeBook (book)) {
        items.push (
          <Book key={book._id}
            user={this.state.user}
            book={book}
            handleRequest={() => {
              this.context.store.dispatch (createTradeRequest (book));
            }}
            handleCancelRequest={() => {
              this.context.store.dispatch (deleteTradeRequest (book));
            }}
          />
        );
      }
    }

    return (
      <div className='homePage'>
        {topMessage}
        <div className='items'>
          <Masonry elementType='div'>
            {items}
          </Masonry>
        </div>
      </div>
    );
  }
}

DisplayPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
}

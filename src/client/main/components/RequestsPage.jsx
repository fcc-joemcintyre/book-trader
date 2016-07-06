import React from 'react';
import {deleteTradeRequest, executeTrade} from '../store/actions';

export default class RequestsPage extends React.Component {
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
      this.setState ({books: s.books, user: s.user.id});
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    let itemsRequested = [];
    let itemsPending = [];
    console.log ('RequestsPage:books', this.state.books);
    let books = this.state.books;
    for (let book of books) {
      if (book.requesterId === this.state.user) {
        itemsRequested.push (
          <tr key={book._id}>
            <td className='r-title'>{book.title}</td>
            <td className='r-author'>{book.author}</td>
            <td className='r-owner'>{book.owner}</td>
            <td className='r-action'>
              <button
                onClick={() => {
                  this.context.store.dispatch (deleteTradeRequest (book));
                }}
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      } else if ((book.ownerId === this.state.user) && (book.requesterId !== '')) {
        itemsPending.push (
          <tr key={book._id}>
            <td className='r-title'>{book.title}</td>
            <td className='r-author'>{book.author}</td>
            <td className='r-requester'>{book.requester}</td>
            <td className='r-action'>
              <button
                onClick={() => {
                  this.context.store.dispatch (executeTrade (book));
                }}
              >
                Approve
              </button>
              <button
                onClick={() => {
                  this.context.store.dispatch (deleteTradeRequest (book));
                }}
              >
                Decline
              </button>
            </td>
          </tr>
        );
      }
    }

    return (
      <div className='requestsPage'>
        <h2>Your Requests</h2>
        {itemsRequested.length === 0 ?
          <p>No outstanding requests.</p> :
          <table>
            <thead>
              <tr>
                <th className='r-title'>Title</th>
                <th className='r-author'>Author</th>
                <th className='r-owner'>Owner</th>
                <th className='r-action'>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemsRequested}
            </tbody>
          </table>
        }

        <hr/>
        <h2>Trade Requests</h2>
        {itemsPending.length === 0 ?
          <p>No pending requests.</p> :
          <table>
            <thead>
              <tr>
                <th className='r-title'>Title</th>
                <th className='r-author'>Author</th>
                <th className='r-requester'>Requester</th>
                <th className='r-action'>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemsPending}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

RequestsPage.contextTypes = {
  store: React.PropTypes.object.isRequired
}

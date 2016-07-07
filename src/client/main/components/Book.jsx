import React from 'react';
import {Link} from 'react-router';
import {createTradeRequest, deleteTradeRequest} from '../store/actions';

export default class Book extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      cover: this.props.book.cover
    }
  }

  render () {
    let buttonArea;
    if ((this.props.user !== '') && (this.props.book.ownerId !== this.props.user)) {
      if (this.props.book.requesterId === this.props.user) {
        buttonArea =
          <div className='buttonArea'>
            <button
              onClick={() => {
                this.context.store.dispatch (deleteTradeRequest (this.props.book));
              }}
            >
              Cancel Request
            </button>
          </div>;
      } else if (this.props.book.requesterId === '') {
        buttonArea =
          <div className='buttonArea'>
            <button
              onClick={() => {
                this.context.store.dispatch (createTradeRequest (this.props.book));
              }}
            >
              Request Book
            </button>
          </div>;
      }
    }

    return (
      <div className='book'>
        <div className='imageContainer'>
          <img src={this.state.cover}
            onError={() => {
              this.setState ({cover: `${location.origin}/images/image404-75.png`});
            }}
          />
        </div>
        <p className='bookTitle'>{this.props.book.title}</p>
        <p className='bookAuthor'>{this.props.book.author}</p>
        <div>
          <span className='category'>
            <Link to={'/books/category/' + this.props.book.category}>{this.props.book.category}</Link>
          </span>
          <span className='owner'>
            <Link to={'/books/owner/' + this.props.book.ownerId}>{this.props.book.owner}</Link>
          </span>
        </div>
        {buttonArea}
      </div>
    );
  }
}

Book.contextTypes = {
  store: React.PropTypes.object.isRequired
}

Book.propTypes = {
  user: React.PropTypes.string.isRequired,
  book: React.PropTypes.object.isRequired
};

import React from 'react';
import {Link} from 'react-router';

export default class ManageBook extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      cover: this.props.book.cover
    }
  }

  render () {
    let buttonArea =
      <div className='buttonArea'>
        <button onClick={() => this.props.handleEditBook (this.props.book._id)}>Edit</button>
        <button onClick={() => this.props.handleDeleteBook (this.props.book._id)}>Delete</button>
      </div>;

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
          <span className='category'>{this.props.book.category}</span>
        </div>
        {buttonArea}
      </div>
    );
  }
}

ManageBook.propTypes = {
  book: React.PropTypes.object.isRequired,
  handleEditBook: React.PropTypes.func,
  handleDeleteBook: React.PropTypes.func,
};

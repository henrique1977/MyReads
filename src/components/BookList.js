import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const BookList = ({books, onMove}) => {

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf books={books.filter((book) => (book.shelf === 'currentlyReading'))} title="Currently Reading" onMove={onMove} shelfString="currentlyReading" />
          <BookShelf books={books.filter((book) => (book.shelf === 'wantToRead'))} title="Want to Read" onMove={onMove}  shelfString="wantToRead" />
          <BookShelf books={books.filter((book) => (book.shelf === 'read'))} title="Read" onMove={onMove}  shelfString="read" />
        </div>
      </div>
      <div className="open-search">
        <Link className="add-contact"
              to="/search"
        >
        Add a Book
        </Link>
      </div>
    </div>
  );
};

export default BookList;

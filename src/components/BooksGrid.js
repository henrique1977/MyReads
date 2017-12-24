import React from 'react';
import Book from './Book';

const BooksGrid = ({books, onMove}) => {

  return (
      <ol className="books-grid">
        { books.map((book, index) => {
          return (
            <Book book={book} key={index} onMove={onMove} />
          )
        }) }
      </ol>
  );
};

export default BooksGrid;

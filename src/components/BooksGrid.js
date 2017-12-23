import React from 'react';
import Book from './Book';

const BooksGrid = ({books, onMove, shelfString}) => {

  return (
      <ol className="books-grid">
        { books.map((book, index) => {
          return (
            <Book book={book} key={index} onMove={onMove} shelfString={shelfString} />
          )
        }) }
      </ol>
  );
};

export default BooksGrid;

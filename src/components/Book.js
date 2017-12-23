import React from 'react';

const Book = ({book, shelf, shelfString, onMove}) => {

  const thumbnail = (book.imageLinks) ? book.imageLinks.thumbnail : '';
  const backgroundImageLink = 'url(' + thumbnail + ')';

  let authorsName = '';
  if (book.authors && book.authors.length > 0) {
    authorsName = book.authors.reduce((acc, name) => {
      return acc + ", " + name;
    });
  }

  const handleMoveShelf = (event) => {
    console.log('clicked');
    console.log(event.target.value);
    onMove(book, event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: backgroundImageLink }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={handleMoveShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{authorsName}</div>
    </div>
  );
};

export default Book;

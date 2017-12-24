import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BooksGrid from './BooksGrid';

class Search extends Component {

  constructor(props) {
    super(props);

    this.searchBooks = this.searchBooks.bind(this);
    this.updateShelf = this.updateShelf.bind(this);

    this.state = {
      searchResults: [],
      searchTerm: ''
    };
  }

  searchBooks(term) {
    BooksAPI.search(term).then((searchResult) => {
      const myBooks = this.props.books;

      if ((!searchResult) || searchResult.error) {
        // no books found, update state
        this.setState({ searchResults: [] });
        return;
      }

      const books = searchResult.map((book) => {
        let shelf = 'none';
        const myBook = myBooks.find((bk) => bk.id === book.id);
        if (myBook) {
          shelf = myBook.shelf;
        }
        return ({...book, shelf: shelf});
      });

      this.setState({ searchResults: books });
    });
  }

  updateShelf(book, shelf) {
    book.shelf = shelf;
    this.props.onMove(book, shelf);
  }

  updateSearch(searchTerm) {
    this.setState({ searchTerm: searchTerm });
    this.searchBooks(searchTerm);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text"
              placeholder="Search by title or author"
              value={this.state.searchTerm}
              onChange={(event) => this.updateSearch(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={this.state.searchResults} onMove={this.updateShelf} />
        </div>
      </div>
    );
  }

};

export default Search;

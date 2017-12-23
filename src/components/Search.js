import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BooksGrid from './BooksGrid';

class Search extends Component {

  constructor(props) {
    super(props);

    // // this is necessary to make sure this still works in the right context for the methods below
    // this.getBookList = this.getBookList.bind(this);
    // this.moveToDifferentBookShelf = this.moveToDifferentBookShelf.bind(this);
    this.searchBooks = this.searchBooks.bind(this);

    this.state = {
      searchResults: [],
      searchTerm: ''
    };
  }

  componentDidMount() {
    console.log('Search did mount');
    console.log(this.props.books);
  }

  searchBooks(term) {
    BooksAPI.search(this.state.searchTerm).then((books) => {
      console.log('promise finished.');
      console.log(books);
      const myBooks = this.props.books;

      if (books) {
        const bks = books.map((book) => {
          let shelf = 'None';
          const myBook = myBooks.find((bk) => bk.id === book.id);
          if (myBook) {
            shelf = myBook.shelf;
          }
          return ({...book, shelf: shelf});
        });
          this.setState({ searchResults: bks });
      }
      else {
        this.setState({ searchResults: [] });
      }

    });
  }

  updateSearch(searchTerm) {
    console.log('searched: ' + searchTerm);
    this.setState({ searchTerm: searchTerm.trim() });
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
          <BooksGrid books={this.state.searchResults} onMove={this.props.onMove} shelfString={this.props.shelfString} />
        </div>
      </div>
    );
  }

};

export default Search;

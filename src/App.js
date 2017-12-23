import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import BookList from './components/BookList';
//import Books from './pages/Books';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);

    // this is necessary to make sure this still works in the right context for the methods below
    this.getBookList = this.getBookList.bind(this);
    this.moveToDifferentBookShelf = this.moveToDifferentBookShelf.bind(this);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    this.getBookList();

  }

  getBookList() {
    BooksAPI.getAll().then((values) => this.setState({
        books: values
    }));
  }

  // after moving to a different shelf, I've decided to call the API again to get a most recent list of
  // books, instead of parsing the response and moving books to shelfs myself.
  moveToDifferentBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then((values) => this.getBookList());
  }

  render() {
    console.log(this.state.books);
    return (
      <div className="app">
          <Route
            path="/"
            exact render={() => (
              <BookList books={this.state.books} onMove={this.moveToDifferentBookShelf} />
            )}
          />
          <Route
            render={() => (
              <Search books={this.state.books} onMove={this.moveToDifferentBookShelf} />
            )}
            path="/search"
          />
      </div>
    )
  }
}

export default BooksApp

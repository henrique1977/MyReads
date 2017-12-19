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

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((values) => this.setState({
        books: values
    }));
  }

  render() {
    return (
      <div className="app">
          <Route
            path="/"
            exact render={() => (
              <BookList books={this.state.books} />
            )}
          />
          <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp

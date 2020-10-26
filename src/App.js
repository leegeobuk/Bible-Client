import React, { Component } from 'react';
import Home from "./routes/Home";
import { Route } from 'react-router-dom';
import About from './routes/About';
import Login from './routes/Login';
import Signup from './routes/Signup';
import AuthChecker from './components/auth/AuthChecker';
import Script from './routes/Script';
import classes from './App.module.css';

class App extends Component {
  state = {
    version: "KRV",
    ot: [],
    nt: [],
    books: [],
    loggedIn: false,
    token: null,
  }

  setBooks = (books) => {
    const {ot, nt} = books.data;
    this.setState(current => ({
      version: current.version,
      ot: ot,
      nt: nt,
      books: [...ot, ...nt],
      loggedIn: current.loggedIn,
      token: current.token
    }));
  }

  isTokenEmpty = (token) => {
    return token === null;
  }

  setToken = (token) => {
    this.setState(current => ({
      version: current.version,
      ot: current.ot,
      nt: current.nt,
      books: current.books,
      loggedIn: !this.isTokenEmpty(token),
      token: token
    }));
  }

  tokenize = (data) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + data.expiresIn);
    return {
      accessToken: data.accessToken,
      expiry: date,
      type: data.type
    };
  }
  
  render() {
    const {version, ot, nt, books, loggedIn, token} = this.state
    return (
      <div className={classes.App}>
        <AuthChecker token={token} loggedIn={loggedIn} setToken={this.setToken} tokenize={this.tokenize} />
        <Route exact path={"/"}>
          <Home version={version} ot={ot} nt={nt} setBooks={this.setBooks} />
        </Route>
        <Route exact path={"/about"} component={About} />
        <Route 
          exact path={"/login"} 
          render={props => (
            <Login 
              location={props.location} 
              setToken={this.setToken}
              tokenize={this.tokenize}
              {...props} 
            />
          )}
        />
        <Route exact path={"/signup"} component={Signup} />
        {books.map((book, i) => {
          return <Route key={i} path={`/${version}/${book.book_name}/:chapter`} component={Script} />
        })}
      </div>
    );
  }
}

export default App;

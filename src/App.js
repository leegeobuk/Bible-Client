import React, { Component } from 'react';
import Home from "./routes/Home";
import { BrowserRouter, Route } from 'react-router-dom';
import Script from './routes/Script';
import axios from 'axios';
import About from './routes/About';
import Login from './routes/Login';
import Signup from './routes/Signup';
import AuthChecker from './components/auth/AuthChecker';
import classes from './App.module.css';

const baseUrl = "https://6vmwgwqpq0.execute-api.ap-northeast-2.amazonaws.com/alpha/"

class App extends Component {
  state = {
    version: "KRV",
    ot: [],
    nt: [],
    books: [],
    loggedIn: false,
    token: null
  }

  getBooks = async () => {
    try {
      const books = await axios.get(baseUrl);
      const {ot, nt} = books.data;
      this.setState(current => ({
        version: current.version,
        ot: ot,
        nt: nt,
        books: [...ot, ...nt]
      }));
    } catch (error) {
      console.log("error: " + error);
    }
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

  componentDidMount() {
    this.getBooks();
  }
  
  render() {
    const {version, ot, nt, books, loggedIn, token} = this.state
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <AuthChecker token={token} loggedIn={loggedIn} setToken={this.setToken} />
          <Route exact path={"/"}>
            <Home version={version} ot={ot} nt={nt} />
          </Route>
          <Route exact path={"/about"} component={About} />
          <Route 
            exact path={"/login"} 
            render={props => (
              <Login 
                location={props.location} 
                setToken={this.setToken}
                {...props} 
              />
            )}
          />
          <Route exact path={"/signup"} component={Signup} />
          {books.map((book, i) => {
            return <Route path={`/${version}/${book.book_name}/:chapter`} component={Script} key={i} />
          })}
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

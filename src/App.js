import React, { Component } from 'react';
import Home from "./routes/Home";
import { BrowserRouter, Route } from 'react-router-dom';
import Script from './routes/Script';
import axios from 'axios';
import MainNav from './components/nav/MainNav';
import About from './routes/About';
import Login from './routes/Login';
import Signup from './routes/Signup';
import classes from './App.module.css';

const baseUrl = "https://6vmwgwqpq0.execute-api.ap-northeast-2.amazonaws.com/alpha/"

class App extends Component {
  state = {
    version: "KRV",
    ot: [],
    nt: [],
    books: [],
    loggedIn: false
  }

  getBooks = async () => {
    try {
      const books = await axios.get(baseUrl);
      const {ot, nt} = books.data;
      this.setState(current => ({
        version: current.version,
        ot: ot,
        nt: nt,
        books: [...ot, ...nt],
        loggedIn: current.loggedIn
      }))
    } catch (error) {
      console.log("error: " + error);
    }
  }
  
  markLoggedIn = () => {
    this.setState(current => ({
      version: current.version,
      ot: current.ot,
      nt: current.nt,
      books: current.books,
      loggedIn: true
    }))
  }
  
  render() {
    const {version, ot, nt, books, loggedIn} = this.state
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <MainNav loggedIn={loggedIn} />
          <Route exact path={"/"}>
            <Home version={version} ot={ot} nt={nt} />
          </Route>
          <Route exact path={"/about"} component={About} />
          <Route exact path={"/login"} render={props => (<Login location={props.location} markLoggedIn={this.markLoggedIn} {...props} />)} />
          <Route exact path={"/signup"} component={Signup} />
          {books.map((book, i) => {
            return <Route path={`/${version}/${book.book_name}/:chapter`} component={Script} key={i} />
          })}
        </BrowserRouter>
      </div>
    )
  }

  componentDidMount() {
    this.getBooks();
  }
}

export default App;

import React, { Component } from 'react';
import Home from "./routes/Home";
import { BrowserRouter, Route } from 'react-router-dom';
import Script from './routes/Script';
import axios from 'axios';
import MainNav from './components/nav/MainNav';
import About from './routes/About';
import Login from './routes/Login';
import classes from './App.module.css';

const baseUrl = "https://6vmwgwqpq0.execute-api.ap-northeast-2.amazonaws.com/alpha/"

class App extends Component {
  state = {
    version: "KRV",
    ot: [],
    nt: [],
    books: []
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
      }))
    } catch (error) {
      console.log("error: " + error);
    }
  }
  
  render() {
    const {version, ot, nt, books} = this.state
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <MainNav />
          <Route exact path={"/"}>
            <Home version={version} ot={ot} nt={nt} />
          </Route>
          <Route exact path={"/about"} component={About} />
          <Route exact path={"/login"} component={Login} />
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

import React from 'react';
import Home from "./routes/Home";
import { HashRouter, Route } from 'react-router-dom';
import Script from './routes/Script';
import axios from 'axios';
import MainNav from './components/MainNav';
import About from './routes/About';
import classes from './App.module.css';

const baseUrl = "https://6vmwgwqpq0.execute-api.ap-northeast-2.amazonaws.com/alpha/"

class App extends React.Component {
  state = {
    version: "KRV",
    books: []
  }

  getBooks = async () => {
    const books = await axios.get(baseUrl)
    this.setState(current => ({version: current.version, books: books.data.books}))
  }
  
  render() {
    const {version, books} = this.state
    return (
      <div className={classes.App}>
        <HashRouter>
          <MainNav />
          <Route exact path={"/"}>
            <Home version={version} books={books} />
          </Route>
          <Route exact path={"/about"} component={About} />
          {books.map((book, i) => {
            return <Route path={`/${version}/${book.book_name}/:chapter`} component={Script} key={i} />
          })}
        </HashRouter>
      </div>
    )
  }

  componentDidMount() {
    this.getBooks();
  }
}

export default App;

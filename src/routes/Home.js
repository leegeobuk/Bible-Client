import React, { Component } from 'react';
import axios from 'axios';
import BookLinks from '../components/bible/BookLinks';
import { API_URL } from "../util/env";
import classes from "./Home.module.css";

const homeUrl = `${API_URL}/`;

class Home extends Component {
  loadBooks = async () => {
    try {
      const books = await axios.get(homeUrl);
      this.props.setBooks(books);
    } catch (error) {
      console.log("error: " + error);
    }
  }

  componentDidMount() {
    this.loadBooks();
  }
  
  render() {
    const {version, ot, nt} = this.props;
    return (
      <div className={classes.Home}>
        <h1 className={classes.main_theme}>주께로 향하는 삶</h1>
        <BookLinks version={version} ot={ot} nt={nt} />
      </div>
    );
  }
}

export default Home;

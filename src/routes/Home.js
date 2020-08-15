import React, { Component } from 'react';
import Book from '../components/bible/Book';
import classes from "./Home.module.css";

class Home extends Component {
  render() {
    const {version, ot, nt} = this.props
    return (
      <div className={classes.Home}>
        <h1 className={classes.main_theme}>주께로 향하는 삶</h1>
        <div>
          구약<br/>
          {ot.map((book, i) => {
            return <Book key={i} version={version} book={book} />
          })}
          <br/><br/>
          신약<br/>
          {nt.map((book, i) => {
            return <Book key={i} version={version} book={book} />
          })}
        </div>
      </div>
    )
  }
}

export default Home;

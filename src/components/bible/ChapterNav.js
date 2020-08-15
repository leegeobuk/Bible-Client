import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./ChapterNav.module.css";

class ChapterNav extends Component {
  render() {
    const {version, book} = this.props;
    const chapterArray = Array(+book.chapters).fill().map((_, i) => i+1);
    return (
      <div className={classes.Nav}>
        {chapterArray.map((ch, i) => {
          return <NavLink className={classes.link} activeClassName={classes.active} key={`${book.book_id}${i}`} to={{
            pathname: `/${version}/${book.book_name}/${ch}`,
            state: {
              version: version,
              book: book,
              chapter: ch
            }
          }}>
            {ch}
          </NavLink>;
        })}
      </div>
    )
  }
}

export default ChapterNav;

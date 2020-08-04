import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./ChapterNav.module.css";

class ChapterNav extends Component {
  render() {
    const {version, book} = this.props;
    const chapterArray = Array(+book.chapters).fill().map((_, i) => i+1);
    return (
      <div>
        {chapterArray.map((ch, i) => {
          // const chapter = (i !== 0 && i % 30 === 0) ? [<br/>, ch] : ch;
          return <NavLink className={classes.Nav} activeClassName={classes.active} key={`${book.book_id}${i}`} to={{
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

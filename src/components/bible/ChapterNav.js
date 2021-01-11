import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./ChapterNav.module.css";

class ChapterNav extends Component {
  render() {
    const {version, bookLink} = this.props;
    const chapterArray = Array(+bookLink.chapters).fill().map((_, i) => i+1);
    return (
      <div className={classes.Nav}>
        {chapterArray.map((ch, i) => {
          return <NavLink className={classes.link} key={`${bookLink.abbreviation}${i}`} to={{
            pathname: "/script",
            search: `?b=${bookLink.abbreviation}&c=${ch}`,
            state: {
              version: version,
              bookLink: bookLink,
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

import React from "react";
import { Link } from "react-router-dom";
import classes from "./BookLink.module.css";

const BookLink = ({ version, bookLink }) => {
  return (
    <Link className={classes.book} to={{
      pathname: "/script",
      search: `?b=${bookLink.abbreviation}&c=1`,
      state: {
        version: version,
        bookLink: bookLink,
        chapter: "1"
      }
    }}>
      {bookLink.fullName}
      <br />
    </Link>
  );
}

export default BookLink

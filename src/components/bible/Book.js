import React from "react";
import { Link } from "react-router-dom";
import classes from "./Book.module.css";

function Book({ version, book}) {
  return (
    <Link className={classes.book} to={{
      pathname: `/${version}/${book.book_name}/1`,
      state: {
        version: version,
        book: book,
        chapter: "1"
      }
    }}>
      {book.book_name}
      <br />
    </Link>
  )
}

export default Book

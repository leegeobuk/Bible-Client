import React from "react";
import { Link } from "react-router-dom";

function Book({ version, book}) {
  return (
    <Link to={{
      pathname: `/${version}/${book.book_name}/1`,
      state: {
        version: version,
        bookId: book.book_id,
        chapter: "1"
      }
    }}>
      {book.book_name}
      <br />
    </Link>
  )
}

export default Book

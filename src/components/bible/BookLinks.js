import React from "react";
import BookLink from "./BookLink";

const BookLinks = ({version, ot, nt}) => {
  return(
    <div>
      구약<br/>
      {ot.map((book, i) => {
        return <BookLink key={i} version={version} book={book} />
      })}
      <br/><br/>
      신약<br/>
      {nt.map((book, i) => {
        return <BookLink key={i} version={version} book={book} />
      })}
    </div>
  );
}

export default BookLinks;

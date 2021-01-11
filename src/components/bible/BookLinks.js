import React from "react";
import BookLink from "./BookLink";

const BookLinks = ({version, ot, nt}) => {
  return(
    <div>
      구약<br/>
      {ot.map((bookLink, i) => {
        return <BookLink key={i} version={version} bookLink={bookLink} />
      })}
      <br/><br/>
      신약<br/>
      {nt.map((bookLink, i) => {
        return <BookLink key={i} version={version} bookLink={bookLink} />
      })}
    </div>
  );
}

export default BookLinks;

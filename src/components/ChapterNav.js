import React from "react";
import { Link } from "react-router-dom";

class ChapterNav extends React.Component {
  render() {
    const {version, book} = this.props
    const chapterArray = Array(+book.chapters).fill().map((_, i) => i+1)
    return (
      <div>
        {chapterArray.map((ch, i) => {
          return (
            <Link key={i} to={{
              pathname: `/${version}/${book.book_name}/${ch}`,
              state: {
                version: version,
                book: book,
                chapter: ch
              }
            }}>
              {ch}&nbsp;
            </Link>
          )
        })}
      </div>
    )
  }
}

export default ChapterNav;

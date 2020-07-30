import React from 'react';
import Book from '../components/Book';

class Home extends React.Component {
  render() {
    const {version, books} = this.props
    return (
      <div className="Home">
        <h1>주께로 향하는 삶</h1>
        <div>
          {books.map((book, i) => {
            return <Book key={i} version={version} book={book} />
          })}
        </div>
      </div>
    )
  }
}

export default Home;

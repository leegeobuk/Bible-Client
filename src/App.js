import React from 'react';
import Book from './components/book';
import axios from 'axios';

const baseUrl = "https://6vmwgwqpq0.execute-api.ap-northeast-2.amazonaws.com/alpha/"

class App extends React.Component {
  state = {
    books: []
  }

  getBooks = async () => {
    const books = await axios.get(baseUrl)
    this.setState({books: books.data.books})
  }
  
  render() {
    return (
      <div className="App">
        <h1>주께로 향하는 삶</h1>
        <h3>Life Inclined to God</h3>
        {this.state.books.map((book, i) => {
          return <Book key={i} book={book} />
        })}
      </div>
    )
  }

  componentDidMount() {
    this.getBooks();
  }
}

export default App;

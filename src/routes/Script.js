import React from "react";
import axios from "axios";
import Verse from "../components/Verse";
import ChapterNav from "../components/ChapterNav";

const baseUrl = "https://6vmwgwqpq0.execute-api.ap-northeast-2.amazonaws.com/alpha/"

class Script extends React.Component {
  state = {
    passages: []
  }

  getScriptByChapter = async () => {
    const {version, book, chapter} = this.props.location.state
    const script = await axios.get(baseUrl + `${version}/${book.book_id}/${chapter}`)

    this.setState({
      passages: script.data.passages
    })
  }

  componentDidMount() {
    this.getScriptByChapter();
  }
  
  componentDidUpdate() {
    this.getScriptByChapter();
  }

  componentWillUnmount() {
    
  }

  render() {
    const {passages} = this.state
    const {version, book, chapter} = this.props.location.state
    return (
      <div>
        <h1>
          {`${book.book_name} ${chapter}장`}
        </h1>
        <ChapterNav version={version} book={book} />
        <div>
          {passages.map((passage, i) => {
            return <Verse key={i} passage={passage} />
          })}
        </div>
      </div>
    )
  }
}

export default Script;

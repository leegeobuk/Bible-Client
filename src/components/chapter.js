import React from "react";
import axios from "axios";
import Verse from "./verse";

const baseUrl = "https://6vmwgwqpq0.execute-api.ap-northeast-2.amazonaws.com/alpha/"

class Chapter extends React.Component {
  state = {
    version: "KRV",
    bookId: "Gen",
    chapterId: "1",
    passages: []
  }

  getScriptByChapter = async () => {
    const {version, bookId, chapterId} = this.state
    const script = await axios.get(baseUrl + `${version}/${bookId}/${chapterId}`)

    this.setState(current => ({
      version: current.version,
      bookId: current.bookId,
      chapterId: current.bookId,
      passages: script.data.passages
    }))
  }

  render() {
    const {passages} = this.state
    return (
      <div>
        {passages.map((passage, i) => {
          return <Verse key={i} passage={passage} />
        })}
      </div>
    )
  }

  componentDidMount() {
    this.getScriptByChapter();
  }
}

export default Chapter;

import React from "react";
import axios from "axios";
import Verse from "../components/Verse";

const baseUrl = "https://6vmwgwqpq0.execute-api.ap-northeast-2.amazonaws.com/alpha/"

class Script extends React.Component {
  state = {
    version: "KRV",
    bookId: "Gen",
    chapter: "1",
    passages: []
  }

  getScriptByChapter = async () => {
    console.log(this.props)
    const {version, bookId, chapter} = this.props.location.state
    const script = await axios.get(baseUrl + `${version}/${bookId}/${chapter}`)

    this.setState({
      passages: script.data.passages
    })
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

export default Script;

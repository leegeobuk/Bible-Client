import React, { Component } from "react";
import axios from "axios";
import Verse from "../components/bible/Verse";
import ChapterNav from "../components/bible/ChapterNav";
import { API_URL } from "../util/env";

const baseUrl = `${API_URL}/`;

class Script extends Component {
  state = {
    passages: []
  }

  getScript = async () => {
    const {version, book, chapter} = this.props.location.state
    const script = await axios.get(baseUrl + `${version}/${book.book_id}/${chapter}`)

    this.setState({
      passages: script.data.passages
    })
  }

  updateScript = async () => {
    const {version, book, chapter} = this.props.location.state
    const script = await axios.get(baseUrl + `${version}/${book.book_id}/${chapter}`)
    const prevPassages = this.state.passages;

    if (JSON.stringify(prevPassages) !== JSON.stringify(script.data.passages)) {
      this.setState({
        passages: script.data.passages
      })
    }
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push("/");
      return;
    }
    this.getScript();
  }

  componentDidUpdate() {
    this.updateScript();
  }

  render() {
    const {passages} = this.state
    if (!this.props.location.state) {
      return null;
    }

    const {version, book, chapter} = this.props.location.state;
    return (
      <div>
        <h1>
          {`${book.book_name} ${chapter}장`}
        </h1>
        <ChapterNav version={version} book={book} />
        <table>
          <tbody>
            {passages.map((passage, i) => {
              return <Verse key={i} passage={passage} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Script;

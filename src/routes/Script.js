import React, { Component } from "react";
import axios from "axios";
import Verse from "../components/bible/Verse";
import ChapterNav from "../components/bible/ChapterNav";
import { API_URL } from "../util/env";

const baseUrl = `${API_URL}/`;

class Script extends Component {
  state = {
    verseList: []
  }

  getScript = async () => {
    const {version, bookLink, chapter} = this.props.location.state;
    const scriptUrl = baseUrl + `script?b=${bookLink.abbreviation}&c=${chapter}`;
    const script = await axios.get(scriptUrl)

    this.setState({
      verseList: script.data.verseList
    })
  }

  updateScript = async () => {
    const {version, bookLink, chapter} = this.props.location.state;
    const scriptUrl = baseUrl + `script?b=${bookLink.abbreviation}&c=${chapter}`;
    const script = await axios.get(scriptUrl);
    const prevPassages = this.state.verseList;

    if (JSON.stringify(prevPassages) !== JSON.stringify(script.data.verseList)) {
      this.setState({
        verseList: script.data.verseList
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
    const {verseList} = this.state
    if (!this.props.location.state) {
      return null;
    }

    const {version, bookLink, chapter} = this.props.location.state;
    return (
      <div>
        <h1>
          {`${bookLink.fullName} ${chapter}장`}
        </h1>
        <ChapterNav version={version} bookLink={bookLink} />
        <table>
          <tbody>
            {verseList.map((verse, i) => {
              return <Verse key={i} verse={verse} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Script;

import React from "react";
import classes from "./Verse.module.css";

function Verse({verse}) {
  return (
    <tr>
      <td className={classes.reference}>
        {verse.verse}
      </td>
      <td className={classes.verse}>
        {verse.text}
      </td>
    </tr>
  )
}

export default Verse;

import React from "react";
import classes from "./Verse.module.css";

function Verse({passage}) {
  return (
    <tr>
      <td className={classes.reference}>
        {passage.reference}
      </td>
      <td className={classes.verse}>
        {passage.text}
      </td>
    </tr>
  )
}

export default Verse;

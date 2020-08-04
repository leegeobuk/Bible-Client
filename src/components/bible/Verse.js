import React from "react";

function Verse({passage}) {
  return (
    <div>
      {`${passage.reference} ${passage.text}`}
      <br />
    </div>
  )
}

export default Verse;

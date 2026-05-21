import React from "react";
import Bombie from "src/Lib/ComponentGenerator";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";

export default function ComponentGenerator() {
  const [data, setdata] = React.useState([]);
  const [effect, seteffect] = React.useState([]);

  return (
    <bombieContext.Provider value={[data, setdata, effect, seteffect]}>
      <Bombie />
    </bombieContext.Provider>
  );
}

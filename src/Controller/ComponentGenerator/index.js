import React from "react";
import Bombie from "src/Lib/ComponentGenerator";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import { TextField, Grid, Stack, Typography } from "@mui/material";

class ComponentGenerator extends React.Component {
  render() {
    return <ComponentGenerator_FunctionalComponent />;
  }
}

function ComponentGenerator_FunctionalComponent() {
  const [data, setdata] = React.useState([]);
  const [effect, seteffect] = React.useState([]);

  const [resolveReject, setResolveReject] = React.useState([]);
  const [myResolve, myReject] = resolveReject;

  const Promise = React.useCallback(() => {
    return new Promise(function (myResolve, myReject) {
      setResolveReject([myResolve, myReject]);
    });
  }, []);

  return (
    <bombieContext.Provider value={[data, setdata, effect, seteffect]}>
      <Bombie />
    </bombieContext.Provider>
  );
}

export default ComponentGenerator;

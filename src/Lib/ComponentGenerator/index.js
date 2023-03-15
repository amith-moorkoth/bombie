import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Toolbar,
  Button,
  Stack,
  Box,
  Paper,
  Drawer,
} from "@mui/material";
import { Container } from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Elements from "./Elements";
import ReactJson from "react-json-view";
import bombieContext from "src/Lib/ComponentGenerator/bombie-context";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  //textAlign: "center",
}));

export default function ComponentGenerator() {
  const [data, setdata, effect, seteffect] = React.useContext(bombieContext);
  const [jsonViewOpener, setjsonViewOpener] = React.useState(false);
  console.log(data);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Toolbar sx={{ px: "0px !important" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button variant="outlined" sx={{ mx: "2px" }}>
                  Upload
                </Button>
                <Button variant="outlined" sx={{ mx: "2px" }}>
                  Download
                </Button>
                <Button variant="outlined" sx={{ mx: "2px" }}>
                  Preview
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    setjsonViewOpener(true);
                  }}
                >
                  <VisibilityIcon />
                  View JSON
                </Button>
                <Drawer
                  anchor={"right"}
                  open={jsonViewOpener}
                  onClose={() => {
                    setjsonViewOpener(!jsonViewOpener);
                  }}
                >
                  <ReactJson src={data} />
                  <ReactJson src={effect} />
                </Drawer>
              </Grid>
            </Grid>
          </Toolbar>
        </Grid>
        <DndProvider backend={HTML5Backend}>
          <Grid item xs={10}>
            <Item>
              <Container />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item
              sx={{
                position: "absolute",
                maxHeight: "60%",
                overflow: "auto",
              }}
            >
              <Elements />
            </Item>
          </Grid>
        </DndProvider>
      </Grid>
    </Box>
  );
}

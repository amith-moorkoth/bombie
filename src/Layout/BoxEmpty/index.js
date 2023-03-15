import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Outlet, Link } from "react-router-dom";
import logo from "src/assets/logo.svg";

function BoxEmpty() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

BoxEmpty.propTypes = {};

export default BoxEmpty;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SideMenu from "../components/SideMenu";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Header from "../components/Header";
import UtilProvider from "../Contexts/util";
import Routes from "../routes/Route";

import Lotes from "../pages/Lotes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "80px",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <UtilProvider>
      <BrowserRouter>
        <Routes />
        <ThemeProvider theme={theme}>
          <SideMenu />
          <div className={classes.appMain}>
            <Header />
            <Lotes />
          </div>
          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </UtilProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import SideMenu from "../components/SideMenu";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Header from "../components/Header";
import AuthProvider from "../contexts/auth";
import Routes from "../routes/Route";

import Lotes from "../pages/Lotes";
import SignIn from "../pages/Signin";

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
    <AuthProvider>
      <BrowserRouter>
       
        <ThemeProvider theme={theme}>       
                  
        <Routes />     
        <SignIn/>
         
          <CssBaseline />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import InLineLoader from "./components/InlineLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "react-notifications/lib/notifications.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";
import {NotificationContainer} from 'react-notifications';
import Sidebar from "./containers/Sidebar/index";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./containers/Header/Header";
import { HOME, COURSE, TEACHER } from "./constants/pages.js";
import "./styles/App.css"
import "./styles/CheckBoxOption.css"
import "./styles/ClickToShow.css"
import "./styles/Header.css"
import "./styles/index.css"
import "./styles/Intro.css"
import "./styles/LeftSideBar.css"
import "./styles/PasswordInput.css"
import "./styles/Modal.css"
import "./styles/Table.css"

const Home = lazy(() => import('./containers/Home'));
const Course = lazy(() => import('./containers/Course'));
const Teacher = lazy(() => import('./containers/Teacher'));

const SusspenseLoading = ({ children }) => (
  <Suspense fallback={<InLineLoader />}>{children}</Suspense>
);

function App() {
  useEffect(() => {
    document.title = "CNPMNC";
  }, []);

  return (
    <>
      <NotificationContainer/>

      <CssBaseline />
      <Router>
        <Header />
        <Grid container spacing={0} sx={{ marginTop: 8, paddingLeft:5 }}>
          {/* <Grid item md={1} lg={1}></Grid> */}
          <Grid item xs={12} md={3} lg={3} xl={3}>
            <Sidebar />
          </Grid>
        <Grid item xs={12} md={8} lg={8} xl={8} sx={{ marginTop: 4, marginLeft:10 }}>
          <SusspenseLoading>
            <Switch>
              <Route exact path={HOME}>
                <Home />
              </Route>
              <Route path={COURSE}>
                <Course />
              </Route>
              <Route path={TEACHER}>
                <Teacher />
              </Route>
            </Switch>
          </SusspenseLoading>
        </Grid>
        </Grid>
      </Router>
    </>
  );
}

export default App;

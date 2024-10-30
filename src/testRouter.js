import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const NotFound = lazy(() => import("./components/NotFound"));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;

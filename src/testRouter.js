import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Lazy load các component
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const NotFound = lazy(() => import("./components/NotFound"));

const Routes = () => {
  return (
    <Router>
      {/* Sử dụng Suspense để hiển thị fallback khi các component đang tải */}
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {/* Các route chính */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />

          {/* Route cho trang không tồn tại */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;

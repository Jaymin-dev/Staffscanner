import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AOS from "aos";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";

const renderRoutes = () => {
  const renderRoute = (routerProps, Component, props, isPrivate = false) => {
    if (Component) {
      const componentProps = {
        ...routerProps,
        ...props,
      };
      return <Component {...componentProps} />;
    }
    return null;
  };

  return Routes.map((route) => (
    <Route
      key={route.name}
      exact={route.exact}
      path={route.path}
      render={(routerProps) =>
        renderRoute(routerProps, route.component, route.props, route.isPrivate)
      }
    />
  ));
};

const Router = () => <Switch>{renderRoutes()}</Switch>;

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="App gradient-background">
      <Router />
    </div>
  );
};

export default withRouter(App);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { NotificationContainer } from "react-notifications";
import configureStore, { history } from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-notifications/lib/notifications.css";
import "react-loading-skeleton/dist/skeleton.css";
import "aos/dist/aos.css";

const initialState = {};

const store = configureStore(initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {console.log(store.replaceReducer)}
      <ConnectedRouter history={history}>
        <App />
        <NotificationContainer />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { routerMiddleware as reduxRouterMiddleware, syncHistoryWithStore } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import { updateMyInfoAction } from './store/actions';
import thunk from "redux-thunk";
//import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise";
import reducers from "./store/configureStore";
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();
const routerMiddleware = reduxRouterMiddleware(browserHistory);
const store =
  process.env.NODE_ENV !== "production"
    ? createStore(
        reducers,
        composeWithDevTools(
          applyMiddleware(routerMiddleware, promiseMiddleware, /*logger,*/  thunk)
        )
      )
    : createStore(
        reducers,
        composeWithDevTools(
          applyMiddleware(routerMiddleware, promiseMiddleware, thunk)
        )
      );

const myInfo = JSON.parse(sessionStorage.getItem("myinfo"));
if(myInfo) store.dispatch(updateMyInfoAction(myInfo));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();

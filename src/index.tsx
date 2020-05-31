import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Router} from "react-router";
import {Container} from "typedi";
import {HistoryService} from "./core-services/history.service";
import "reflect-metadata";
const historyService = Container.get(HistoryService);
ReactDOM.render(
    <React.StrictMode>
        <Router history={historyService.history}>
            <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

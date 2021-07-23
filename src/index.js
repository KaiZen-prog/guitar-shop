import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./store/reducers/root-reducer";
import "./sass/style.scss";

const store = createStore(
    rootReducer
);

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
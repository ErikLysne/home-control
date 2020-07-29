import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./redux";

import Background from "./components/Background";
import InfoBar from "./components/InfoBar";
import HomeScreen from "./components/HomeScreen";
import MainMenu from "./components/MainMenu";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

function App() {
    return (
        <Provider store={store}>
            <Background />
            <InfoBar />
            <HomeScreen />
            <MainMenu />
        </Provider>
    );
}

export default App;

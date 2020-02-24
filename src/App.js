import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ConfigureStore from "./redux";
import AppContainer from "./components/AppContainer/AppContainer";

const { store, persistor } = ConfigureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <AppContainer />
      </Router>
    </PersistGate>
  </Provider>
);

export default App;

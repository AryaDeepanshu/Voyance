import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
// import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // use .env here
  <GoogleOAuthProvider clientId="773894358678-1ibvr30beij0c42d4m6spqrlg1cvm61f.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);

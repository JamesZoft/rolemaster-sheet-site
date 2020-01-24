import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as svc from "./serviceAccountKey.json";
import Authorised from "./Authorised";

const App = () => {
  let app = !firebase.apps[0]
    ? firebase.initializeApp({
        apiKey: svc.apiKey,
        databaseURL: "https://rolemaster-sheet-app.firebaseio.com",
        storageBucket: "rolemaster-sheet-app.appspot.com",
        authDomain: "rolemaster-sheet-app.web.app",
        projectId: "rolemaster-sheet-app"
      })
    : firebase.apps[0];

  return <Authorised app={app} />;
};

export default App;

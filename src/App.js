import React, { Fragment, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as svc from "./serviceAccountKey.json";
import Authorised from "./Authorised";

function App() {
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
}

export default App;

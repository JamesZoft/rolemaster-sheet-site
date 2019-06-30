import React, { Fragment, useState } from "react";
import FrontPage from "./front-page";
// import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as svc from "./serviceAccountKey.json";

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

  const [user, initialising, error] = useAuthState(app.auth());

  const login = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    provider.setCustomParameters({
      prompt: "select_account"
    });
    app
      .auth()
      .signInWithRedirect(provider)
      .then(result => {
        console.log(result);
      });
  };

  // app.auth().onAuthStateChanged(user => {});

  // let base = Rebase.createClass(app.database());

  const logout = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
        user.delete();
      });
  };
  const InitialisingBlock = initialising ? (
    <div>
      <p>Initialising User...</p>
    </div>
  ) : (
    undefined
  );

  const ErrorBlock = (
    <div>
      <p>Error: {error}</p>
    </div>
  );

  //correct firebase.rules:
  /*
  
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
    	allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid != null
    }
  }
}

*/

  const LoggedInBlock = user ? (
    <div>
      <p>Current User: {user.email}</p>
      <p>Current User: {user.uid}</p>
      <button onClick={logout}>Log out</button>
    </div>
  ) : (
    <button onClick={login}>Log in</button>
  );

  const [value, loading, collErr] = useCollection(
    // app.firestore().doc("users/" + user.uid),
    app.firestore().doc("users/0"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  return (
    <Fragment>
      {loading && <div>Loading data...</div>}
      {collErr && <div>Error loading data</div>}
      {/* {!loading && value && (
        <span>
          Collection:{" "}
          {value.docs.map(doc => (
            <React.Fragment key={doc.id}>
              {JSON.stringify(doc.data())},{" "}
            </React.Fragment>
          ))}
        </span>
      )} */}
      {!loading && value && JSON.stringify(value.get("characters")[0])}

      {InitialisingBlock}
      {error && ErrorBlock}
      {LoggedInBlock}
      {!loading && <FrontPage {...value.get("characters")[0]} />}
    </Fragment>
  );
}

export default App;

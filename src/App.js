import React, { Fragment, useState } from "react";
import FrontPage from "./front-page/frontpage";
import SkillsPage from "./skills/skills";
// import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import * as svc from "./serviceAccountKey.json";
import KeyboardEventHandler from "react-keyboard-event-handler";
import newChar from "./newCharacter.json";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Footer = styled.div`
    span {
      margin-right: 20px;
    }
  `,
  Wrapper = styled.div`
    margin-bottom: 1em;
    overflow-y: scroll;
    max-width: 100%;
    height: 93vh;
  `;

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

  // let base = Rebase.createClass(app.firestore());

  // const [characters, setCharacters] = useState({});

  // useEffect(() => {
  //   const ref = base.bindCollection("users/0/characters", {
  //     context: {
  //       setState: ({ characters }) => setCharacters({ ...characters }),
  //       state: { characters }
  //     },
  //     state: "characters"
  //   });

  //   return () => {
  //     base.removeBinding(ref);
  //   };
  // }, []);

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
      <span>Current User: {user.email}</span>
      <span style={{ float: "right" }}>Current User ID: {user.uid}</span>
      <button onClick={logout}>Log out</button>
    </div>
  ) : (
    <button onClick={login}>Log in</button>
  );

  // let userDoc = app
  //   .firestore()
  //   .collection("users")
  //   .doc("0");
  // userDoc.set({
  //   email: "blah"
  // });
  // userDoc
  //   .collection("characters")
  //   .doc("0")
  //   .set(newChar.characters[0]);

  const Front = (
    <Wrapper>
      <FrontPage firestore={app.firestore()} />
    </Wrapper>
  );

  return (
    <Fragment>
      <Router>
        {/* {value &&
        Object.keys(value).map((k, i) => (
          <div key={i}>{JSON.stringify(k)}</div>
        ))} */}

        {/* {value && JSON.stringify(value.data())} */}

        {InitialisingBlock}
        {error && ErrorBlock}
        {LoggedInBlock}
        <Route exact path="/" component={() => Front} />
        <Route path="skills" component={() => SkillsPage} />
        <Footer>
          <span>
            <Link to="/">[Front Sheet]</Link>
          </span>
          <span>
            <Link to="skills">[Skill Sheet]</Link>
          </span>
        </Footer>
      </Router>
    </Fragment>
  );
}

export default App;

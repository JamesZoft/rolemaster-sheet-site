import React, { Fragment, useState } from "react";
import FrontPage from "./front-page/frontpage";
import SkillsPage from "./skills/skills";
// import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import * as svc from "./serviceAccountKey.json";
import KeyboardEventHandler from "react-keyboard-event-handler";
import newChar from "./newCharacter.json";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DevSheet from "./dev-sheet/devsheet";
import newc from "./newchar.json";

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

  const LoggedInBlock = (
    <div style={{ marginBottom: 20 }}>
      {user ? (
        <Fragment>
          <span>Current User: {user.email}</span>
          <span style={{ float: "right" }}>Current User ID: {user.uid}</span>
          <button onClick={logout}>Log out</button>
        </Fragment>
      ) : (
        <button onClick={login}>Log in</button>
      )}
    </div>
  );

  // let userDoc = app
  //   .firestore()
  //   .collection("users")
  //   .doc("0");
  // userDoc.set({
  //   email: "blah"
  // });
  // const a = newc;
  // userDoc
  //   .collection("characters")
  //   .doc("0")
  //   .set(a);

  const [value, loading, collErr] = useDocument(
    app
      .firestore()
      .collection("users")
      .doc("0")
      .collection("characters")
      .doc("0"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  if (!value) {
    return <Fragment>{loading && <div>Loading data...</div>}</Fragment>;
  } else {
    const charData = value.data();
    const Front = (
      <Wrapper>
        <FrontPage data={charData} firestore={app.firestore()} />
      </Wrapper>
    );
    const Skills = (
      <Wrapper>
        <SkillsPage data={charData} firestore={app.firestore()} />
      </Wrapper>
    );
    const Dev = (
      <Wrapper>
        <DevSheet data={charData} firestore={app.firestore()} />
      </Wrapper>
    );
    return (
      <Fragment>
        <Router>
          {InitialisingBlock}
          {error && ErrorBlock}
          {LoggedInBlock}
          <Route exact path="/" component={() => Front} />
          <Route exact path="/skills" component={() => Skills} />
          <Route exact path="/devsheet" component={() => Dev} />
          <Footer>
            <span>
              <Link to="/">[Front Sheet]</Link>
            </span>
            <span>
              <Link to="skills">[Skill Sheet]</Link>
            </span>
            <span>
              <Link to="devsheet">[Dev Sheet]</Link>
            </span>
          </Footer>
        </Router>
      </Fragment>
    );
  }
}

export default App;

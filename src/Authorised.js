import React, { Fragment } from "react";
import Main from "./main";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Authorised = props => {
  const [user, initialising, error] = useAuthState(props.app.auth());
  const login = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    provider.setCustomParameters({
      prompt: "select_account"
    });
    props.app
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
    props.app
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
        user.delete();
      });
  };

  if (user) {
    return (
      <Fragment>
        <Fragment>
          <span>Current User: {user.email}</span>
          <span style={{ float: "right" }}>Current User ID: {user.uid}</span>
          <button onClick={logout}>Log out</button>
        </Fragment>
        <Main {...props} user={user} />
      </Fragment>
    );
  } else if (initialising) {
    return <div>Initialising...</div>;
  } else if (error) {
    return (
      <div>
        An error occurred whilst authorising or fetching data - you may be having network issues. 
        If not, please contact me directly to sort it out!
      </div>
    );
  } else {
    return (
      <>
        <button onClick={login}>Log in</button>
        <div style={{padding: 10, marginTop: 10}}>
          This app uses google OAuth2 to identify you and allow you access to read, create and modify 
          characters belonging to you. I am only using your very basic info - email, google id and such - 
          no usage of your contacts, or access to anything else is requested, and no sensitive information
          is stored - only your email and google uid. If in doubt, please contact me 
          (<a href="mailto:james@jamesreed.name">james@jamesreed.name</a>) and I will be more than happy
          to show you how I am authorising you, and prove that the above is true.
        </div>
        <div style={{padding: 10, marginTop: 10}}>
          If you are happy to proceed, please click the login button above, which will either create you 
          a new account or access your existing one.
        </div>
      </>
    );
  }
};

export default Authorised;

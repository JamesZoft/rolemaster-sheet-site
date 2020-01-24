import React, { Fragment } from "react";
import { useDocumentOnce, useDocument } from "react-firebase-hooks/firestore";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";
import FrontPage from "./front-page/frontpage";
import SkillsPage from "./skills/skills";
import DevSheet from "./dev-sheet/devsheet";
import MagicSheet from "./magic/magicSheet";
import SpellsSheet from "./magic/spellsSheet";

const Footer = styled.div`
    span {
      margin-right: 20px;
    }
  `,
  Wrapper = styled.div`
    margin-bottom: 1em;
    min-height: 100vh;
  `,
  StyledLink = styled(Link)`
    cursor: pointer;
  `;

const Main = props => {
  const [value, loading, collErr] = useDocumentOnce(
    props.app
      .firestore()
      .collection("users")
      .doc(props.user.email)
      .collection("characters")
      .doc("0"),
    
  );

  if (!value && loading) {
    return <Fragment>{loading && <div>Loading data...</div>}</Fragment>;
  } else if (collErr) {
    return (
      <div>
        Error whilst loading data, please try to refresh, or if that doesn't
        work, contact me directly!
      </div>
    );
  } else {
    const charData = value && {
      ...value.data(),
      email: props.user.email,
    };
    const Front = charData ? (
      <Wrapper>
        <FrontPage data={charData} firestore={props.app.firestore()} />
      </Wrapper>
    ) : null;
    const Skills = charData ? (
      <Wrapper>
        <SkillsPage 
          data={charData} 
          firestore={props.app.firestore()} 
        />
      </Wrapper>
    ) : null;
    const Dev = charData ? (
      <Wrapper>
        <DevSheet data={charData} firestore={props.app.firestore()} />
      </Wrapper>
    ) : null;
    const Magic = charData ? (
      <Wrapper>
        <MagicSheet {...charData} firestore={props.app.firestore()} />
      </Wrapper>
    ) : null;
    const Spells = charData ? (
      <Wrapper>
        <SpellsSheet magicLists={charData.magicLists} exp={charData.experience} />
      </Wrapper>
    ) : null;

    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {/* {JSON.stringify(charData)} */}
        
        <Router>
          <div>
            <Route exact path="/" component={() => Front} />
            <Route exact path="/skills" component={() => Skills} />
            <Route exact path="/devsheet" component={() => Dev} />
            <Route exact path="/magic" component={() => Magic} />
            <Route exact path="/spells" component={() => Spells} />
          </div>
          <div>
            <Footer>
            <span>
              <StyledLink to="/">[Front Sheet]</StyledLink>
            </span>
            <span>
              <StyledLink to="skills">[Skill Sheet]</StyledLink>
            </span>
            <span>
              <StyledLink to="devsheet">[Dev Sheet]</StyledLink>
            </span>
            <span><StyledLink to="magic">[Magic]</StyledLink></span>
            <span>
              <StyledLink to="spells">[Spell Lists]</StyledLink>
            </span>
            </Footer>
          </div>
        </Router>
      </div>
    );
  }
};

export default Main;

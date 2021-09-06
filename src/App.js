import { fire, projectFirestore } from "./firebase";
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import React, { useState } from "react";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Inbox from "./components/Inbox";
import ImageGrid from "./components/image-grid";
import './App.css';
import ContactSeller from "./components/ContactSeller";
import UploadProductForm from "./components/upload-form";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import UpdateInfo from "./components/UpdateInfo";
import UseSearch from "./components/handleSearch";

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [clicked, setClicked] = useState(false);
  const [userNickname, setUserNickname] = useState('');

  const handleClick = () => {
    setClicked(!clicked);
  };

  const getNickname = async() => {
    await projectFirestore.collection('testCreateUser').doc(currentUser).get()
        .then(doc => setUserNickname(doc.data().nickname));
  }

  fire.auth().onAuthStateChanged((authUser) => {
    if (authUser) {
      setCurrentUser(authUser.uid);
      if(currentUser) {
        getNickname();
      }

    } else {
      setCurrentUser('');
      setUserNickname('');
    }
  });

  const handleLogOut = (e) => {
    fire.auth().signOut();
  }

  return (
      <Router>
        <div className="main-navbar">
          <nav className="nav-bar">
            <ul className={currentUser ? 'nav-menu' : 'nav-menu-off'} onClick={handleClick}>
              <li className={currentUser ? "sign-off hvr" : "sign-on hvr"}>
                <NavLink to="/SignUp" activeClassName="active">הרשמה לאתר</NavLink>
              </li>
              <li className={currentUser ? "sign-off hvr" : "sign-on hvr"}>
                <NavLink to="/LogIn" activeClassName="active">התחברות לאתר</NavLink>
              </li>
              <li className="hvr">
                <NavLink to="/Inbox" activeClassName="active">תיבת הודעות</NavLink>
              </li>
              <li className="hvr">
                <NavLink to="/Upload" activeClassName="active">העלאת מוצר לאתר</NavLink>
              </li>
              <li className="hvr">
                <NavLink to="/Search" activeClassName="active" exact={true}>מוצרים</NavLink>
              </li>
              <li className="hvr">
                <NavLink to="/Home" activeClassName="active" exact={true}>דף הבית</NavLink>
              </li>
              <li className="hello-user hvr">
                {currentUser &&  <NavLink to="/UserSettings"> שלום {userNickname} </NavLink> }
              </li>
              <li className="logout-btn">
                <Link className={currentUser ? 'logout-button' : 'hide-logout'} onClick={handleLogOut} to={{
                  pathname: "/Home"
                }}>LogOut</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/Home" component={LandingPage} />
            <Route path="/Search" component={ImageGrid} />
            <Route path="/TempHome" component={Home} />
            <Route path="/Inbox" component={Inbox} />
            <Route path="/Upload" component={UploadProductForm} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/LogIn"  component={LogIn} />
            <Route path="/ContactSeller" component={ContactSeller} />
            <Route path="/Search" component={LandingPage} />
            <Route path="/UserSettings" component={UpdateInfo} />
          </Switch>
        </div>
      </Router>

  );
}

export default App;

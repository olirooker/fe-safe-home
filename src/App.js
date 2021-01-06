import { React, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import Toggle from "./components/Toggler";
import Header from "./components/Header";
import Login from "./components/Login";
import Loading from "./components/Loading";
import Logout from "./components/Logout";
import Main from "./components/Main";
import UserProfile from "./components/UserProfile";
import TravelAdvice from "./components/TravelAdvice";
import { Router, navigate } from "@reach/router";
import "./components/styles/App.css";
import "./components/styles/mainContent.css";
import "./components/styles/header.css";
import "./components/styles/loading.css";
import "./components/styles/loginPage.css";
import "./components/styles/travelAdvice.css";
import "./components/styles/userProfile.css";
import "./components/styles/navbar.css";
import "./components/styles/error.css";
import "./components/styles/signInEmail.css";
import { auth, provider } from "./FirebaseConfig";
import Navbar from "./components/Navbar";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  // state stuff
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // componentDidMount to check local storage for logged in state
  useEffect(() => {
    const localLoggedIn = localStorage.getItem("loggedIn");
    if (localLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     setIsLoggedIn(true);
    //   }
    // });
    setIsLoading(false);
  }, []);

  // dark mode stuff
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  // method to toggle isLoggedIn in state
  const setLoggedIn = () => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      // set local state
      localStorage.setItem("loggedIn", "true");
    }
  };
  // method to set current user id in state
  const setId = (id) => {
    setUserId(id);
  };
  // method to set current userName in state
  const setUsername = (username) => {
    setUserName(username);
  };
  //method to logout

  const logout = () => {
    auth.signOut().then(() => {
      localStorage.setItem("loggedIn", "false");
      setIsLoggedIn(false);
      navigate("/");
    });
  };

  // console.log(isLoggedIn, '<<isLoggedIn');
  console.log(theme, "newTheme");
  if (!mountedComponent) return <div />;
  return (
    // dark mode styled components wrapper
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        {/* check if isLoading */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="App">
            <div className="headerContainer">
              <Toggle theme={theme} toggleTheme={themeToggler} />
              <Header />
              {/* render logout button only when user logged in */}
              {isLoggedIn && (
                <Logout
                  theme={theme}
                  toggleTheme={themeToggler}
                  logout={logout}
                />
              )}
            </div>
            {/* check if isLoggedIn */}
            {!isLoggedIn ? (
              // pass login methods to Login component
              <Login
                setId={setId}
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
                path="/"
              />
            ) : (
              <>
                <Navbar />

                <Router>
                  <Main path="/main" theme={theme} />
                  <UserProfile path="/user-profile" />
                  <TravelAdvice path="/travel-advice" />
                  <ErrorMessage msg="Page not found" code="404" default />
                </Router>
              </>
            )}
          </div>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;

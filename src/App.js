import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import About from './About.js';
import AccountInformation from './AccountInformation.js';
import AllUserVisualizations from './AllUserVisualizations.js';
import BrowseVisualizations from './BrowseVisualizations.js';
import GenreMostCommonColors from './GenreMostCommonColors.js';
import GenrePercentageVisualizer from './GenrePercentageVisualizer.js';
import Home from './Home.js';
import NavBar from './NavBar.js';
import PlaylistSubmit from './PlaylistSubmit.js';
import UserLogIn from './UserLogIn.js';
import UserSignUp from './UserSignUp.js';
import 'bootstrap/dist/css/bootstrap.min.css'; import './App.css';

function App() {  

  let [user, setUser] = useState({user_id: Number(localStorage.getItem("userId")),
                                      fname: localStorage.getItem("userFname"),
                                      lname: localStorage.getItem("userLname"),
                                      username: localStorage.getItem("userUsername"),
                                      password: localStorage.getItem("userPassword")});

  let [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));

  let handleLogIn = async (evt) => {
      evt.preventDefault();

      let userExists = await fetch("/api/log-in", {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: user.username,
              password: user.password
          }),
      });

      if(userExists.status===200){
          let foundUser = await fetch("/api/log-in", {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: user.username,
                  password: user.password
              }),
          })
          .then((response) => response.json())
          .then((data) => setUser({user_id: data.user_id,
                                  fname: data.fname,
                                  lname: data.lname,
                                  username: data.username,
                                  password: data.password
          }));
          setLoggedIn(true);
          localStorage.setItem("loggedIn", true);

      } else if (userExists.status===401){
          alert(userExists.statusText);
      }
  };


  function setSession() {
      localStorage.setItem("userId", user.user_id);
      localStorage.setItem("userFname", user.fname);
      localStorage.setItem("userLname", user.lname);
      localStorage.setItem("userUsername", user.username);
      localStorage.setItem("userPassword", user.password);
  }

  Promise.all([handleLogIn, setSession()]);

  let handleLogout = async (evt) => {
      evt.preventDefault();
      setLoggedIn(false);
      localStorage.setItem("isLoggedIn", false);
      setUser({user_id: "",
              fname:"",
              lname:"",
              username:"",
              password:""});
      
      let removeUser = await fetch("/api/log-out", {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
          body: JSON.stringify({
              username: user.username
          }),
      });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
      <BrowserRouter>
          <NavBar loggedIn={loggedIn} 
                  handleLogout={handleLogout}
                  user={user} 
          />
          <Routes>
              <Route path ='/' element = {<Home />}/>
              <Route path ='/about' element = {<About />}/>
              <Route path='/sign-up' element ={loggedIn ? <Navigate to='/my-profile' /> :
                  <UserSignUp
                      setFname={(evt) => setUser({ ...user, fname: evt.target.value })}
                      setLname={(evt) => setUser({ ...user, lname: evt.target.value })}
                      setUsername={(evt) => setUser({ ...user, username: evt.target.value })}
                      setPassword={(evt) => setUser({ ...user, password: evt.target.value })}
                  />} 
              />
              <Route path='/log-in' element={loggedIn ? <Navigate to='/my-profile' />:
                  <UserLogIn handleLogIn={handleLogIn}
                  setUsername={(evt) => setUser({ ...user, username: evt.target.value })}
                  setPassword={(evt) => setUser({ ...user, password: evt.target.value })} 
                  />} 
              />
              <Route path='/my-profile' element={ <AccountInformation /> } />
              <Route path={`/profile/${user.user_id}/visualizations`} element={<AllUserVisualizations user={user}/>} />
              <Route path='/submit-playlist' element={<PlaylistSubmit /> } />
              <Route path={"/visualization-generator/:playlist_id"} element ={<><GenrePercentageVisualizer loggedIn={loggedIn}
                                                                                                              user={user}/>
                                                                              <GenreMostCommonColors/></>}
              />
              <Route path='/browse-visualizations' element={<BrowseVisualizations /> } />
              <Route path='/log-out' element={<Navigate to='/' />} />
          </Routes>
      </BrowserRouter>
    );
};

export default App;

import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import About from './About.js';
import AccountInformation from './AccountInformation.js';
import AllUserVisualizations from './AllUserVisualizations.js';
import BrowseVisualizations from './BrowseVisualizations.js';
import BrowseUsers from './BrowseUsers.js';
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
      fetch("/api/log-in", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          username: user.username,
          password: user.password}),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoggedIn(true);
          localStorage.setItem("loggedIn", true);
          setUser({user_id: data.user_id,
                    fname: data.fname,
                    lname: data.lname,
                    username: data.username,
                    password: data.password})
          });
          console.log(user);
    } else if (userExists.status===401){
        alert(userExists.statusText);
        window.location.reload();
    }
  };

  const handleSignIn = async (evt) => {
    evt.preventDefault();
    let newUser = await fetch('/api/sign-up', { 
        method: "POST",
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(user),
    });
    if(newUser.status===200){
        fetch("/api/sign-up", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
            body: JSON.stringify({
              fname: user.fname,
              lname: user.lname,
              username: user.username,
              password: user.password}),
        })
        .then((response) => response.json())
        .then((data) => {
          setLoggedIn(true);
          localStorage.setItem("loggedIn", true);
          setUser({user_id: data.user_id,
                  fname: data.fname,
                  lname: data.lname,
                  username: data.username,
                  password: data.password})
          });
          console.log(user);  
    } else if (newUser.status===401) {
        alert("An account already exists with that username. Please try again.");
        window.location.reload();
    }
  } 


  function setSession() {
      localStorage.setItem("userId", user.user_id);
      localStorage.setItem("userFname", user.fname);
      localStorage.setItem("userLname", user.lname);
      localStorage.setItem("userUsername", user.username);
      localStorage.setItem("userPassword", user.password);
  }

  
  Promise.all([handleSignIn, setSession()]);


  let handleLogOut = (evt) => {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", false);
    setUser({user_id: "",
            fname:"",
            lname:"",
            username:"",
            password:""});
            setUser({});
    localStorage.removeItem('user');
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
                  handleLogOut={handleLogOut}
                  user={user} 
          />
          <Routes>
              <Route path ='/' element = {<Home />}/>
              <Route path ='/about' element = {<About />}/>
              <Route path='/sign-up' element = {loggedIn ? <Navigate to='/my-profile' /> :
                  <UserSignUp handleSignIn={handleSignIn}
                      setFname={(evt) => setUser({ ...user, fname: evt.target.value })}
                      setLname={(evt) => setUser({ ...user, lname: evt.target.value })}
                      setUsername={(evt) => setUser({ ...user, username: evt.target.value })}
                      setPassword={(evt) => setUser({ ...user, password: evt.target.value })} 
                  />} 
              />
              <Route path='/log-in' element = {loggedIn ? <Navigate to='/my-profile' />:
                  <UserLogIn handleLogIn={handleLogIn}
                    setUsername={(evt) => setUser({ ...user, username: evt.target.value })}
                    setPassword={(evt) => setUser({ ...user, password: evt.target.value })} 
                  />} 
              />
              <Route path='/my-profile' element={<AccountInformation user={user}/> } />
              <Route path={"/profile/:user_id"} element={<AllUserVisualizations />} />
              <Route path='/submit-playlist' element={<PlaylistSubmit /> } />
              <Route path={"/visualization-generator/:playlist_id"} element ={<GenrePercentageVisualizer loggedIn={loggedIn}
                                                                                                            user={user}/>}
              />
              <Route path='/browse-visualizations' element ={<><BrowseVisualizations />
                                                                <BrowseUsers/></>}
              />
              <Route path='/log-out' element={<Navigate to='/' />} />
          </Routes>
      </BrowserRouter>
    );
};

export default App;

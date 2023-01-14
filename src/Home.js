import React from 'react';
import { useNavigate } from "react-router-dom"
  
const Home = () => {
  const navigate = useNavigate();
    
  return (
      <>
        <h1 class="gradient-text">Welcome!</h1>
        <p>
            Begin crafting a genre color visualizer tailored to your Spotify playlist. 
            Click the button below to find out how to get started!
        </p>
        <button onClick={()=>navigate("/about")}>Get Started</button>
      </>
  )
};
  
export default Home;
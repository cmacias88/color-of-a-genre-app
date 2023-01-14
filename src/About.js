import React from 'react';
import { Link } from "react-router-dom"
  
const About = () => {
    
  return (
      <>
        <h1>About</h1>
        <p>
            This site was inspired by personalized visualization generators like Spotify Wrapped!
        </p>
        <p>
            In order to begin creating your visualization, use a valid and <em>public</em> Spotify playlist link, URI, or ID. 
            Here are some examples of each:
                <li>Spotify Playlist Link: https://open.spotify.com/playlist/7fiod3XXqprAJkisV5vfqF?si=51d4ed7684c248b6</li>
                <li>Spotify Playlist URI: spotify:playlist:7fiod3XXqprAJkisV5vfqF</li> 
                <li>Spotify Playlist ID: 7fiod3XXqprAJkisV5vfqF</li>
        </p>
        <p>
            After copying this format, submit it at <Link to="/submit-playlist">our playlist submitter</Link> to get your Color of A Genre visualization.
        </p>
        <p>
            The visualization will generate a pie chart with percentages based on the frequency of a genre from your submitted playlist 
            along with a list of the most common color for each genre using the track's album cover art. 
            And don't forget to save the customized link to share with your friends!

            Keep in mind that while an account isn't required, it will make it easier to keep track of the visualizations you create through your profile. 
        </p>
        <p>
            Have fun!
        </p>
      </>
  )
};
  
export default About;
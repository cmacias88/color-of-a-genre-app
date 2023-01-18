import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


function PlaylistSubmit() {

    let [playlist, setPlaylist] = useState('');

    let handlePlaylistSubmit = 
        fetch("/api/submit-playlist", {
        method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playlist: "Valid", 
            })
        })
        .then((response) => response.json())
            .then(data => {
                console.log(data)
                setPlaylist(data)
            })

    return(
        <div>
            <h1>
                Submit Your Playlist
            </h1>
            <Form onSubmit={handlePlaylistSubmit} className="forms">
                <Form.Group className="mb-1" controlId="formPlaylistLink">
                    <Form.Label name="playlist">Playlist Link</Form.Label>
                    <Form.Control type="text" placeholder="Enter a Spotify playlist (Link, URI, ID)." onChange={(evt) => setPlaylist(evt.target.value)} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Spotify playlist.
                        If you need help, refer to this link<Link to="/about">here.</Link>
                    </Form.Control.Feedback>
                </Form.Group>
                <button type="submit">
                    Submit
                </button>
            </Form>
        </div>
        )
    };

export default PlaylistSubmit;
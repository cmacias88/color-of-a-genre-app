import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';


function PlaylistSubmit() {

    const [validated, setValidated] = useState(false);
    let [playlist, setPlaylist] = useState('');


    let handlePlaylistSubmit = async (evt) => {
        evt.preventDefault();

        let newPlaylist = await fetch("/api/submit-playlist", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
            body: JSON.stringify({
                playlist: "Valid",
          }),
      });
    };

    return(
        <Form noValidate validated={validated} onSubmit={handlePlaylistSubmit} className="forms">
            <Form.Group className="mb-1" controlId="formPlaylistLink">
                <Form.Label name="playlist_link">Playlist Link</Form.Label>
                <Form.Control type="text" placeholder="Enter a Spotify playlist (Link, URI, ID)." onChange={(evt) => setPlaylist(evt.target.value)} required />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid Spotify playlist.
                    If you need help, refer to this link<Link to="/about">here.</Link>
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        )
    };

export default PlaylistSubmit;
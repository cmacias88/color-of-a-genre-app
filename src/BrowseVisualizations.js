import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';

function BrowseVisualizations() {

    const [allUserData,setAllUserData] = useState([]);
    const [filteredUserData,setFilteredUserData] = useState(allUserData);

    const [allPlaylistData,setAllPlaylistData] = useState([]);
    const [filteredPlaylistData,setFilteredPlaylistData] = useState(allPlaylistData);


    useEffect(() => {
        async function allUsers() {
            const response = await fetch('/api/all-users');
            const fetchedUsers = await response.json(response);
            console.log(fetchedUsers)
            setAllUserData(fetchedUsers);
            setFilteredUserData(fetchedUsers);
        } 
        allUsers()
    }, []);


    useEffect(() => {
        async function allPlaylists() {
            const response = await fetch('/api/all-playlists')
            const fetchedPlaylists = await response.json(response);
            console.log(fetchedPlaylists);
            setAllPlaylistData(fetchedPlaylists);
            setFilteredPlaylistData(fetchedPlaylists);
        }
        allPlaylists()
    }, []);

    const handleUserSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
            console.log(value);
            result = allUserData.filter((data) => {
                return data.user_id.search(value) !== -1;
            });
            setFilteredUserData(result);
        }

    const handlePlaylistSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
            console.log(value);
            result = allPlaylistData.filter((data) => {
                return data.playlist_id.search(value) !== -1;
            });
            setFilteredPlaylistData(result);
        }
        
    return(
        <div>
        <Form className="forms">
            <Row className="mb-3">
                <Form.Group className="mb-1" controlId="formUserSearch">
                    <Form.Label name="user_search">User Search</Form.Label>
                    <Form.Control type="text" placeholder="Search By Username:" onChange={(evt) => handleUserSearch(evt.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formPlaylistSearch">
                    <Form.Label name="playlist_search">Playlist Search</Form.Label>
                    <Form.Control type="text" placeholder="Search By Playlist Name:" onChange={(evt) => handlePlaylistSearch(evt.target.value)} />
                </Form.Group>
            </Row>
            </Form>
            <div>
                {filteredUserData.map((value, index)=>{
                    return(
                        <div key={value.user_id}>
                            <div>
                                <Link to={`/profile/${value.user_id}/visualizations`}>{value.username}'s Profile</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                {filteredPlaylistData.map((value, index)=>{
                    return(
                        <div key={value.playlist_id}>
                            <div>
                                <Link to={`/visualization-generator/${value.playlist_id}`}>{value.playlist_name} Visualizer</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default BrowseVisualizations;
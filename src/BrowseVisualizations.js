import React, { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function BrowseVisualizations() {

    const [playlistData, setPlaylistData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetch("api/all-users")
        .then((response) => response.json())
        .then((data) => 
            setPlaylistData(data)
        )
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = playlistData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(playlistData)
        }
    }

    return (
        <div>
            <Form className="forms">
                <Row className="mb-3">
                    <Form.Group className="mb-1" controlId="formPlaylistSearch">
                        <Form.Label name="playlist_search">Playlist Search</Form.Label>
                        <Form.Control type="text" placeholder="Search By Playlist Name:" onChange={(evt) => searchItems(evt.target.value)} />
                    </Form.Group>
                </Row>
            </Form>
            <Card.Group itemsPerRow={3}>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{item.playlist_name}</Card.Header>
                                    <Card.Link href={`/visualization-generator/${item.playlist_id}`}>
                                        {item.playlist_name} Visualization
                                    </Card.Link>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    playlistData.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{item.playlist_name}</Card.Header>
                                    <Card.Link href={`/visualization-generator/${item.playlist_id}`}>
                                        {item.playlist_name} Visualization
                                    </Card.Link>
                                </Card.Content>
                            </Card>
                        )
                    })
                )}
            </Card.Group>
        </div>
    )
};

export default BrowseVisualizations;

    // const [allUserData,setAllUserData] = useState([]);
    // const [filteredUserData,setFilteredUserData] = useState(allUserData);

    // const [allPlaylistData,setAllPlaylistData] = useState([]);
    // const [filteredPlaylistData,setFilteredPlaylistData] = useState(allPlaylistData);


    // useEffect(() => {
    //     async function allUsers() {
    //         const response = await fetch('/api/all-users');
    //         const fetchedUsers = await response.json(response);
    //         console.log(fetchedUsers)
    //         setAllUserData(fetchedUsers);
    //         setFilteredUserData(fetchedUsers);
    //     } 
    //     allUsers()
    // }, []);


    // useEffect(() => {
    //     async function allPlaylists() {
    //         const response = await fetch('/api/all-playlists')
    //         const fetchedPlaylists = await response.json(response);
    //         console.log(fetchedPlaylists);
    //         setAllPlaylistData(fetchedPlaylists);
    //         setFilteredPlaylistData(fetchedPlaylists);
    //     }
    //     allPlaylists()
    // }, []);

    // const handleUserSearch = (evt) => {
    //     let value = evt.target.value.toLowerCase();
    //     let result = [];
    //         console.log(value);
    //         result = allUserData.filter((data) => {
    //             return data.user_id.search(value) !== -1;
    //         });
    //         setFilteredUserData(result);
    //     }

    // const handlePlaylistSearch = (evt) => {
    //     let value = evt.target.value.toLowerCase();
    //     let result = [];
    //         console.log(value);
    //         result = allPlaylistData.filter((data) => {
    //             return data.playlist_id.search(value) !== -1;
    //         });
    //         setFilteredPlaylistData(result);
    //     }
        
    // return(
    //     <div>
    //         <h1>Browse Our Visualization and User Databases</h1>
    //         <Form className="forms">
    //             <Row className="mb-3">
    //                 <Form.Group className="mb-1" controlId="formUserSearch">
    //                     <Form.Label name="user_search">User Search</Form.Label>
    //                     <Form.Control type="text" placeholder="Search By Username:" onChange={(evt) => handleUserSearch(evt.target.value)} />
    //                     <Form.Control.Feedback type="invalid">
    //                         Please provide a valid first name.
    //                     </Form.Control.Feedback>
    //                 </Form.Group>
    //                 <Form.Group className="mb-1" controlId="formPlaylistSearch">
    //                     <Form.Label name="playlist_search">Playlist Search</Form.Label>
    //                     <Form.Control type="text" placeholder="Search By Playlist Name:" onChange={(evt) => handlePlaylistSearch(evt.target.value)} />
    //                 </Form.Group>
    //             </Row>
    //             </Form>
    //         <div>
    //             {filteredUserData.map((value, index)=>{
    //                 return(
    //                     <div key={value.user_id}>
    //                         <div>
    //                             <Link to={`/profile/${value.user_id}/visualizations`}>{value.username}'s Profile</Link>
    //                         </div>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //         <div>
    //             {filteredPlaylistData.map((value, index)=>{
    //                 return(
    //                     <div key={value.playlist_id}>
    //                         <div>
    //                             <Link to={`/visualization-generator/${value.playlist_id}`}>{value.playlist_name} Visualizer</Link>
    //                         </div>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     </div>
    // )
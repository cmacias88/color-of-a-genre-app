import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BrowseVisualizations() {

    const [playlistData, setPlaylistData] = useState([])
    const [searchInput, setSearchInput] = useState('');

    const excludeColumns = ["id"];

    useEffect(() => {
        fetch("api/all-playlists")
        .then((response) => response.json())
        .then((data) => 
            setPlaylistData(data)
        )
    }, [playlistData])

  // handle change event of search input
    const handleChange = value => {
        setSearchInput(value);
        filterData(value);
    };

  // filter records by search text
    const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setPlaylistData(playlistData);
    else {
    const filteredData = playlistData.filter(item => {
        return Object.keys(item).some(key =>
            excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
    });
        setPlaylistData(filteredData);
    }
  }

    return (
        <div>
            <h1>Browse Visualizations</h1><br /><br />
            Search: <input
            style={{ marginLeft: 5 }}
            type="text"
            placeholder="Type to search..."
            value={searchInput}
            onChange={evt => handleChange(evt.target.value)}
            />
        <div className="box-container">
            {playlistData.map((d, i) => {
                return <div key={d.playlist_id} className="box">
                <b>Playlist name: </b>{d.playlist_name}<br />
                <b>Link: </b><Link to={`/visualization-generator/${d.playlist_id}`}></Link><br />
                </div>
            })}
            <div className="clearboth"></div>
            {playlistData.length === 0 && <span>No records found to display!</span>}
            </div>
        </div>
    );

};

export default BrowseVisualizations;

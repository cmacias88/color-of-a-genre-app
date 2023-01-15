import React from 'react'
import { useParams, Link } from 'react-router-dom';

function AllUserVisualizations() {

    let {user_id} = useParams();

    let allVisualizationInfo = []

    let userVisualizations = fetch('/api/all-playlists')
        .then(response => response.json())
        .then(res => {
            for(const item of res){
                if (parseInt(JSON.stringify(item.user_id)) === user_id) {
                    allVisualizationInfo.push({"playlist_id": parseInt(JSON.stringify(item.playlist_id)),
                                            "playlist_name": JSON.stringify(item.playlist_name)})
                }   
            }
        })

    console.log(allVisualizationInfo)

    return (
        <div>
            <h1>
                Visualizations
            </h1>
            {allVisualizationInfo.map(visualization => (
                <div>
                    <Link to={`/visualization-generator/${visualization.playlist_id}`}>{visualization.playlist_name} Visualization</Link>
                </div>
            ))};
        </div>
    )
}

export default AllUserVisualizations;
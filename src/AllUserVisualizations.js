import React from 'react'
import { Link } from 'react-router-dom';

function AllUserVisualizations() {

    let allVisualizationInfo = []

    const userVisualizations = fetch('/api/my-profile')
        .then(response => response.json())
        .then(res => {
            console.log(res)
            for(const item of res){
                allVisualizationInfo.push(item);
            }
        });
    
    return (
        <div>
            <h1>
                Your Visualizations
            </h1>
            {allVisualizationInfo.map((visualization) => (
                <h2 key={visualization.playlist_id}> 
                <Link to={`/visualization-generator/${visualization.playlist_id}`}>{visualization.playlist_name} Visualization</Link></h2>
            ))};
        </div>
    )
}

export default AllUserVisualizations;
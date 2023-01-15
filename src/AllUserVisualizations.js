import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

function AllUserVisualizations() {

    let {user_id} = useParams();

    const [visualizations, setVisualizations] = useState([]);

    const getVisualizations = async () => {
        try {
            const response = await fetch('/api/all-playlists');
            const data = await response.json();
            for (const visualization of data)
            if (parseInt(JSON.stringify(visualization.user_id)) === user_id) {
                setVisualizations.push(visualization)
            };
            console.log(data);
        } catch (error) {
          console.log(error);
        }
    };
      
    useEffect(() => {
        getVisualizations();
    }, []);

    if (visualizations.length > 0) {
        return (
            <div>
                <h1>
                    Visualizations
                </h1>
                {visualizations.map(visualization => (
                    <div>
                        <Link to={`/visualization-generator/${visualization.playlist_id}`}>{visualization.playlist_name} Visualization</Link>
                    </div>
                ))}
            </div>
        )
    } else {
        return (            
            <div>
                <h1>
                    Visualizations
                </h1>
                <p>
                    It looks like you don't have any playlists currently saved!
                </p>
            </div>
        )
    }
}

export default AllUserVisualizations;
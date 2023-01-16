import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

function AllUserVisualizations() {

    let {user_id} = useParams();

    let userVisualizations = []

    const [visualizations, setVisualizations] = useState([]);

    const getVisualizations = async () => {
        try {
          const response = await fetch('/api/all-playlists');
          const data = await response.json();
          setVisualizations(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
    };
      
    useEffect(() => {
        getVisualizations();
    }, []);

    console.log(visualizations)

    for (const visualization of visualizations) {
        if (parseInt(visualization.user_id) === user_id) {
            userVisualizations.push(visualization)
        }
    };

    console.log(userVisualizations)

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
}

export default AllUserVisualizations;
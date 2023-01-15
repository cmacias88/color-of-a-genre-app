import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from 'react-router-dom';

function GenreMostCommonColors() {

    let genreColors = []; 

    const {playlist_id} = useParams();

    const playlistVisualizationData = fetch(`/api/visualization-generator/${playlist_id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.playlist_genres)
            for(const genreInfo of data.playlist_genres){
                genreColors.push({"genre_name": JSON.stringify(genreInfo.genre_name),
                                  "most_common_color": JSON.stringify(genreInfo.most_common_color)});
            }
          console.log(genreColors)
    });

  return (
    genreColors.map(genre =>
        <Card style={{ backgroundColor: genre.most_common_color }} key={genre.genre_name} className="card">
          <Card.Body>
            <Card.Title>{genre.genre_name}</Card.Title>
            <Card.Text>For this playlist, {genre.genre_name} is {genre.most_common_color}</Card.Text>
          </Card.Body>
        </Card>
    )
  );
    
}

export default GenreMostCommonColors;
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

    const renderCard = (card, index) => {
        return (
          <Card style={{ backgroundColor: card.most_common_color }} key={index} className="box">
            <Card.Body>
              <Card.Title>{card.genre_name}</Card.Title>
              <Card.Text>For this playlist, {card.genre_name} is {card.most_common_color}</Card.Text>
            </Card.Body>
          </Card>
        );
      };
    
    return <div className="grid">{genreColors.map(renderCard)}</div>;
}

export default GenreMostCommonColors;
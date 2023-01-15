import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import randomColor from "randomcolor"
  

function GenrePercentageVisualizer() {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const randomColor = require('randomcolor'); 
    const color = randomColor();

    let genreNames = [];
    let genrePercentages = [];
    let genreColors = [];

    const {playlist_id} = useParams();

    const playlistVisualizationData = fetch(`/api/visualization-generator/${playlist_id}`)
        .then(response => response.json())
        .then(res => {
            console.log(res.playlist_genres)
            for (const genreinfo of res.playlist_genres){
                genreNames.push(JSON.stringify(genreinfo.genre_name));
                genrePercentages.push(parseFloat(JSON.stringify(genreinfo.percentage)))
                genreColors.push({"genre_name": JSON.stringify(genreinfo.genre_name),
                "most_common_color": JSON.stringify(genreinfo.most_common_color)});
            }
            console.log(genreNames)
            console.log(genrePercentages)
        });

    const data = {
        labels: genreNames,
        datasets: [
            {
                label: 'Genre Percentages',
                data: genrePercentages,
                borderColor: color,
                backgroundColor: () => randomColor(genrePercentages.length),
                pointBackgroundColor: color,
            }
    
        ]
    }
    
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Doughnut Chart',
                color:'black',
                font: {
                    size:34
                },
                padding:{
                    top:30,
                    bottom:30
                },
                responsive:true,
                animation:{
                    animateScale: true,
                },
                maintainAspectRatio: true,
            }
        }
    }

    const CardList = genreColors.map((genre) => {
        return(
            <div style={{ backgroundColor: genre.most_common_color }} key={genre.genre_name} className="card">
                <div class="card-body">
                For this playlist, {genre.genre_name} is {genre.most_common_color}
                </div>
            </div>
        )
    })

    return (
        <>
        <div style={{width: "50%", height:"50%", position: "relative"}}>
            <Doughnut data={data} options={options} />
        </div>
        <div>
            {CardList}
        </div>
        </>
    );

}

export default GenrePercentageVisualizer;
import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import randomColor from "randomcolor"
  

function GenrePercentageVisualizer() {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const randomColor = require('randomcolor'); 
    const color = randomColor();

    let genreNames = [];
    let genrePercentages = [];

    const {playlist_id} = useParams();

    const playlistVisualizationData = fetch(`/api/visualization-generator/${playlist_id}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            for(const genreinfo of res){
                genreNames.push(genreinfo.genre);
                genrePercentages.push(parseFloat(genreinfo.genre.percentage));
                }
        });

    const data = {
        labels: genreNames,
        datasets: [
            {
                label: 'Genre Percentages',
                data: genrePercentages,
                borderColor: color,
                backgroundColor: color(genrePercentages.length),
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
                                }
            }
        }
    
    }

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );

}

export default GenrePercentageVisualizer;
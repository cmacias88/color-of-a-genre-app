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
                backgroundColor: () => randomColor(),
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
            <div style={{ backgroundColor: genre.most_common_color }} key={genre.genre_name} class="card">
                <div class="card-body">
                    <p class="card-text">
                        For this playlist, {genre.genre_name} is {genre.most_common_color}
                    </p>
                </div>
            </div>
        )
    })

    return (
        <>
            <div style={{width: "50%", height:"50%", position: "relative"}}>
                <Doughnut data={data} options={options} />
            </div>
            {genreColors.map(genre => (
                <div key={genre.genre_name}>
                <li>
                    For you, {genre.genre_name} is {genre.most_common_color}.
                </li>
            </div>
            ))}
        </>
    );

}

export default GenrePercentageVisualizer;




// import React, { useState, useEffect } from 'react'
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { useParams } from 'react-router-dom';
// import randomColor from "randomcolor"
  

// function GenrePercentageVisualizer() {

//     ChartJS.register(ArcElement, Tooltip, Legend);

//     const randomColor = require('randomcolor'); 
//     const color = randomColor();

//     let genreNames = [];
//     let genrePercentages = [];
//     let genreColors = [];

//     const [visualizationData, setVisualizationData] = useState([]);

//     const {playlist_id} = useParams();

//     const playlistVisualizationData = async() => {
//         const response = await fetch(`/api/visualization-generator/${playlist_id}`)
//         const data = await response.json()
//         setVisualizationData(data.playlist_genres)
//         console.log(data.playlist_genres)
//             for (const genreinfo of data.playlist_genres){
//                 genreNames.push(JSON.stringify(genreinfo.genre_name));
//                 genrePercentages.push(parseFloat(JSON.stringify(genreinfo.percentage)))
//                 genreColors.push(JSON.stringify(genreinfo.most_common_color));
//             }
//             console.log(genreNames)
//             console.log(genrePercentages)
//             console.log(genreColors)
//     };

//     const data = {
//         labels: genreNames,
//         datasets: [
//             {
//                 label: 'Genre Percentage',
//                 data: genrePercentages,
//                 borderColor: color,
//                 backgroundColor: () => randomColor(),
//                 pointBackgroundColor: color,
//             }
    
//         ]
//     }
    
//     const options = {
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Doughnut Chart',
//                 color:'black',
//                 font: {
//                     size:34
//                 },
//                 padding:{
//                     top:30,
//                     bottom:30
//                 },
//                 responsive:true,
//                 animation:{
//                     animateScale: true,
//                 },
//                 maintainAspectRatio: true,
//             }
//         }
//     }

//     const CardList = genreColors.map((genre) => {
//         return(
//             <div style={{ backgroundColor: genre.most_common_color }} key={genre.genre_name} class="card">
//                 <div class="card-body">
//                     <p class="card-text">
//                         For this playlist, {genre.genre_name} is {genre.most_common_color}
//                     </p>
//                 </div>
//             </div>
//         )
//     })

//     useEffect(() => {
//         playlistVisualizationData();
//     }, []);

//     return (
//         <>
//         <div>
//             <Doughnut data={data} options={options} />
//         </div>
//         {visualizationData.map(visualization => (
//                 <div key={visualization.genre_name}>
//                     <li>
//                         For you, {visualization.genre_name} is {visualization.most_common_color}.
//                     </li>
//                 </div>
//         ))}
//         </>
//     );

// }

// export default GenrePercentageVisualizer;
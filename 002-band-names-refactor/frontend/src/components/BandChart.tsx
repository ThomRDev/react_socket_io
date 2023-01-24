// utilizando los componentes porpios de chart.js
// https://github.com/ThomRoman/Farmacia_SOA/blob/main/frontend/src/pharmacy/views/HomeView.tsx
// https://github.com/ThomRoman/Farmacia_SOA/blob/main/frontend/package.json

import { CategoryScale } from "chart.js";
import { useContext, useEffect } from "react"
import Chart from 'chart.js/auto'
import { Band, SocketContext } from "../context/SocketContext";
let myChart:Chart|null = null;
Chart.register(CategoryScale);
export const BandChart = () => {

  const { socket } = useContext(SocketContext)
  useEffect(()=>{
    socket.on('current-bands',(bands:Band[]) => {
      createChart(bands)
    })
    return ()=> {
      socket.off('current-bands')
    }
  },[socket])
  
  const createChart = (bands:Band[]) => {
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
    if(myChart){
      myChart.destroy()
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: bands.map(band=>band.name ),
            datasets: [{
                label: '# of Votes',
                data: bands.map(band=>band.votes ),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          animation: false,
            scales: {
                x: {
                  // me ayuda a que todos comiencen desde cero
                  stacked : true
                }
            },
            // horizontal
            indexAxis: 'y'
        }
    });
  }

  return (
    <canvas id="myChart"></canvas>
  )
}

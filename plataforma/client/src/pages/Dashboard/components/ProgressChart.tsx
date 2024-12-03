import React from 'react';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Investigation } from '../../../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  investigations: Investigation[];
}

export const ProgressChart: React.FC<Props> = ({ investigations }) => {
  const data = {
    labels: investigations.map(inv => inv.titulo.substring(0, 15) + '...'),
    datasets: [
      {
        label: 'Progreso (%)',
        data: investigations.map(inv => inv.progreso),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progreso de Investigaciones'
      }
    }
  };

  return (
    <Box sx={{ height: 300 }}>
      <Line data={data} options={options} />
    </Box>
  );
}; 
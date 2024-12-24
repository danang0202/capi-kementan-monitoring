import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Props untuk komponen chart (opsional)
interface DoughnutChartProps {
  dataCacah: number;
  dataBelumCacah: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ dataCacah, dataBelumCacah }) => {
  // Data chart
  const data = {
    labels: ['Tercacah', 'Belum Tercacah'],
    datasets: [
      {
        data: [dataCacah, dataBelumCacah],
        backgroundColor: ['#00837e', '#D0D0D0'], // Hijau dan abu
        hoverBackgroundColor: ['#1cb048', '#969292'],
      },
    ],
  };

  // Opsi konfigurasi chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;

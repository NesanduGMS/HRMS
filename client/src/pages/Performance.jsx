// import React from 'react'

// const Performance = () => {
//   return (
//     <div>Performance</div>
//   )
// }

// export default Performance

import React from 'react';
import { Bar } from 'react-chartjs-2'; // Assuming you're using Chart.js for the graph
import 'chart.js/auto'; // Automatically register chart elements for Chart.js

const PerformanceCard = ({ jobTitle, experienceYear, ratings }) => {
  const chartData = {
    labels: ratings.map((_, index) => `Q${index + 1}`),
    datasets: [
      {
        label: 'Rating',
        data: ratings,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-72 m-4">
      <h3 className="text-xl font-semibold text-gray-700">{jobTitle}</h3>
      <p className="text-gray-500">Experience: {experienceYear} years</p>
      
      {/* Graph Display */}
      <div className="mt-4">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

const Performance = () => {
  // Example data (you can replace this with real data fetched from your backend)
  const employeePerformances = [
    {
      jobTitle: 'Software Engineer',
      experienceYear: 5,
      ratings: [3, 4, 5, 4, 5],
    },
    {
      jobTitle: 'Data Analyst',
      experienceYear: 3,
      ratings: [4, 4, 3, 5, 4],
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Employee Performance</h2>
      <div className="flex flex-wrap justify-center">
        {employeePerformances.map((performance, index) => (
          <PerformanceCard
            key={index}
            jobTitle={performance.jobTitle}
            experienceYear={performance.experienceYear}
            ratings={performance.ratings}
          />
        ))}
      </div>
    </div>
  );
};

export default Performance;

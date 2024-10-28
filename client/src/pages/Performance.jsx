import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Performance = () => {
  const UID = localStorage.getItem('ID');
  const [performance, setPerformance] = useState([]);
  const [wdetail, setWdetail] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3005/auth/performance/${UID}`)
      .then((result) => {
        if (result.data.Status) {
          setPerformance(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3005/auth/workinfo/${UID}`)
      .then((result) => {
        if (result.data.Status) {
          setWdetail(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F5F7FA' }}>
      {/* Performance Header */}
      <header className="bg-gradient-to-r from-[#17153B] to-[#2E236C] text-white py-6">
        <h1 className="text-3xl text-center font-bold">Employee Performance Overview</h1>
      </header>

      {/* Performance Cards */}
      <div className="flex flex-wrap justify-center mt-6 p-4">
        {performance.map((item, index) => (
          <div
            key={index}
            className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white p-6 m-4 transition-transform transform hover:scale-105 border-l-4 border-[#433D8B]"
          >
            <h2 className="text-xl font-bold mb-4 text-[#2E236C]">Performance Card</h2>
            <div className="mb-2">
              <p className="text-gray-700 font-semibold">JOB POSITION:</p>
              <p className="text-gray-600">{item.Job_Title}</p>
            </div>
            <div className="mb-2">
              <p className="text-gray-700 font-semibold">EXPERIENCE:</p>
              <p className="text-gray-600">{item.Time_Period_Years} years</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold mb-2">RATING:</p>
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={item.Rating_Performance}
                  text={`${item.Rating_Performance}%`}
                  styles={buildStyles({
                    textColor: "#4a5568", // Gray color for text
                    pathColor: "#C8ACD6", // Light shade for progress path
                    trailColor: "#D3D3D3", // Light gray for trail
                  })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Split Footer */}
      <footer className="bg-[#17153B] text-white p-6 mt-6">
        <div className="container mx-auto flex justify-between">
          {/* Section Info */}
          <div className="w-1/2">
            <h3 className="text-lg font-bold mb-2">--Work Section--</h3>
            {wdetail.length > 0 && (
              <>
                <p>{wdetail[0].Work_Section}</p>
                <p>{wdetail[0].Department_Mail}</p>
              </>
            )}
          </div>
          
          {/* Branch Info */}
          <div className="w-1/2 text-right">
            <h3 className="text-lg font-bold mb-2">--Branch--</h3>
            {wdetail.length > 0 && (
              <>
                <p>{wdetail[0].Branch_name}</p>
                <p>{wdetail[0].Location}</p>
                <p>{wdetail[0].Country}</p>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Performance;

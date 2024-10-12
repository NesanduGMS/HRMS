import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ReportCard4() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    navigate(`/PageHR/${id_to_transfer}/ReportGenaration/Report1`);
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <h5 className="text-2xl font-bold text-center mb-2">Salary Report</h5>
      <p className="text-gray-700 text-center mb-4">
      Generate a report for the employee records based on the salary (pay grade) of each employee.
      </p>
      <button
        onClick={handleGenerateReport}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
      >
        Generate Report
      </button>
    </div>
  );
}

export default ReportCard4;


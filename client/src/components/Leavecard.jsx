import React from 'react';

function LeaveCard({ title, days }) {
  return (
    <div className="bg-gray-300 rounded-lg shadow-md p-4"> {/* Tailwind CSS classes for styling */}
      <div className="text-center">
        <h5 className="text-lg font-bold mb-2">{title}</h5>
        <p className="text-gray-700">{days} days</p>
      </div>
    </div>
  );
}

export default LeaveCard;

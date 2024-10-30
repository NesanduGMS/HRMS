// StatCard.jsx
import React from 'react';
import './StatCard.css';

const StatCard = ({ label, value }) => {
    return (
        <div className="stat-card">
            <h3>{label}</h3>
            <p>{value}</p>
        </div>
    );
};

export default StatCard;

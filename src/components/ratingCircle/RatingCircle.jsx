import React from 'react';
import './RatingCircle.css';

const getCircleColor = (rating) => {
    if (rating >= 70) return '#21d17a';
    if (rating >= 40) return '#d2d530';
    return '#d4225d';
};

const RatingCircle = ({ value }) => {
    const radius = 15;
    const stroke = 2;
    const circumference = 2 * Math.PI * radius;
    // This hides the part of the circle that doesn't belong to the rating
    const strokeDashoffset = circumference * (1 - value / 100);

    return (
        <div className="rating-circle">

            <svg height="35" width="35">
                <circle
                    stroke="#666666"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={radius}
                    cx="20"
                    cy="20"
                />
                {/*Colorful circle*/}
                <circle
                    stroke={getCircleColor(value)}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={radius}
                    cx="20"
                    cy="20"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
            </svg>


            <div className="rating-text">
                {value > 0 ? (<span>{value}<sup>%</sup></span>) : (<span>NR</span>)}
            </div>
        </div>
    );
};

export default RatingCircle;


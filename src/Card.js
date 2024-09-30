// src/Card.js
import React from 'react';
import './Card.css'; // Import CSS for styling the card

function Card({ top, left, right, bottom, owner }) {
    return (
        <div className={`card ${owner}`}>
            <div className="value top">{top}</div>
            <div className="value left">{left}</div>
            <div className="value right">{right}</div>
            <div className="value bottom">{bottom}</div>
        </div>
    );
}

export default Card;

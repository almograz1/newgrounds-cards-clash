// src/Card.js
import React from 'react';
import './Card.css'; // Import CSS for styling the card

function Card({ top, left, right, bottom, owner, isFlipped }) {
    return (
        <div className={`card ${owner}`}>
            {
                isFlipped ? (
                    <div className="card-back">
                        <p>Newgrounds Card Game</p>
                    </div>
                ) : (
                <div className="card-values">
                    <div className="value top">{top}</div>
                    <div className="value left">{left}</div>
                    <div className="value right">{right}</div>
                    <div className="value bottom">{bottom}</div>
                </div>
                )
            }
        </div>
    );
}

export default Card;

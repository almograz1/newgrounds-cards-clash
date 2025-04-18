import React from 'react';
import './Card.css'; // Import CSS for styling the card

function Card({ top, left, right, bottom, owner, isFlipped, placed, image, isSelected }) {
    return (
        <div className={`card ${owner} ${placed ? 'placed' : ''} ${isSelected ? 'selected' : ''}`}>
            {
                isFlipped ? (
                    <div className="card-back">
                        <p>Newgrounds</p>
                        <p>Card Clash</p>
                    </div>
                ) : (
                    <div className="card-content">
                        <img src ={image} alt = "Card" className="card-image" />
                        <div className="card-values">
                            <div className="card-value top">{top}</div>
                            <div className="card-value left">{left}</div>
                            <div className="card-value right">{right}</div>
                            <div className="card-value bottom">{bottom}</div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Card;
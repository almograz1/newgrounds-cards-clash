import React, { useState } from 'react';
import './App.css'; // Make sure you have styles for .App and .board
import Card from './Card'; // Import the Card component

function App() {
    // Define a 3x3 board where each cell can hold a card object or be null (empty)
    const [board, setBoard] = useState([
        [
            { top: 5, left: 2, right: 3, bottom: 4, owner: 'blue' }, // Card in position (0, 0)
            null, // Empty cell
            { top: 7, left: 1, right: 9, bottom: 6, owner: 'red' },  // Card in position (0, 2)
        ],
        [
            null, // Empty cell
            { top: 4, left: 5, right: 2, bottom: 8, owner: 'blue' }, // Card in position (1, 1)
            null, // Empty cell
        ],
        [
            null, // Empty cell
            null, // Empty cell
            null, // Empty cell
        ]
    ]);

    // Function to render a Card component if a card exists in the cell
    const renderCellContent = (card) => {
        if (card) {
            return (
                <Card
                    top={card.top}
                    left={card.left}
                    right={card.right}
                    bottom={card.bottom}
                    owner={card.owner}
                />
            );
        } else {
            return null; // Empty cell
        }
    };

    return (
        <div className="App">
            <h1>3x3 Card Game Board</h1>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className="cell">
                                {/* Render a Card component if a card is present, otherwise render an empty cell */}
                                {renderCellContent(cell)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

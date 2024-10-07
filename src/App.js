import React, { useState } from 'react';
import './App.css';
import Card from './Card'; // Assuming you have a Card component and its styles

function App() {
    // Define the board state
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    // Cards for each player
    const [redPlayerCards] = useState([
        { top: 2, left: 4, right: 3, bottom: 5, owner: 'red' },
        { top: 6, left: 5, right: 7, bottom: 1, owner: 'red' },
    ]);

    const [bluePlayerCards] = useState([
        { top: 8, left: 3, right: 4, bottom: 2, owner: 'blue' },
        { top: 1, left: 7, right: 6, bottom: 5, owner: 'blue' },
    ]);

    // Track the currently selected card and player turn
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState('red'); // 'red' starts the game

    // Function to handle card selection
    const handleCardClick = (card, player) => {
        if (player === currentPlayer) {
            setSelectedCard(card);
        }
    };

    // Function to render a card component if a card exists in the cell
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

            {/* Game Container to hold the red player, board, and blue player */}
            <div className="game-container">

                {/* Red Player's Cards Container */}
                <div className="players-cards-container red-player">
                    <h2>Red Player's Cards</h2>
                    {redPlayerCards.map((card, index) => (
                        <Card
                            key={index}
                            top={card.top}
                            left={card.left}
                            right={card.right}
                            bottom={card.bottom}
                            owner={card.owner}
                        />
                    ))}
                </div>

                {/* Board Container */}
                <div className="board">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, colIndex) => (
                                <div key={colIndex} className="cell">
                                    {renderCellContent(cell)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Blue Player's Cards Container */}
                <div className="players-cards-container blue-player">
                    <h2>Blue Player's Cards</h2>
                    {bluePlayerCards.map((card, index) => (
                        <Card
                            key={index}
                            top={card.top}
                            left={card.left}
                            right={card.right}
                            bottom={card.bottom}
                            owner={card.owner}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

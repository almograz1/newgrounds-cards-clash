import React, { useState } from 'react';
import './App.css';
import Card from './Card'; // Assuming you have a Card component and its styles

function App() {
    // Define the board state
    const[winner, setWinner] = useState(null);
    const [board, setBoard] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    // Function to render the content of each cell on the board
    const renderCellContent = (cell) => {
        // If the cell is empty (null), return nothing (renders an empty cell)
        if (!cell) return null;

        // If the cell contains a card, render the Card component with the card's properties
        return (
            <Card
                top={cell.top}
                left={cell.left}
                right={cell.right}
                bottom={cell.bottom}
                owner={cell.owner}
                placed = {true} // indicates a card is placed on the board
                image = {cell.image}
            />
        );
    };

    const randomNumber = () => {
        return Math.floor(Math.random() * 9) + 1;
    }
    // Cards for each player
    const [redPlayerCards, setRedPlayerCards] = useState([
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'red', image: "/cards/images/arnold.png" },
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'red', image: "/cards/images/dadnme.png" },
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'red', image: "/cards/images/evelynn.png" },
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'red', image: "/cards/images/happyfeet.png" },
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'red', image: "/cards/images/icon.png" },

    ]);

    const [bluePlayerCards, setBluePlayerCards] = useState([
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'blue', image: "/cards/images/pablo.png" },
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'blue', image: "/cards/images/ronald.png" },
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'blue', image: "/cards/images/smiley.png" },
        { top: randomNumber(), left: randomNumber(), right: randomNumber(), bottom: randomNumber(), owner: 'blue', image: "/cards/images/yeledkaka.png" },
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

    // Function to place a card on the board
    const placeCardOnBoard = (rowIndex, colIndex) => {
        if (!selectedCard) return;

        const updatedBoard = [...board];

        // Check if the cell is empty before placing the card
        if (!updatedBoard[rowIndex][colIndex]) {
            updatedBoard[rowIndex][colIndex] = selectedCard;

            setBoard(updatedBoard);

            // Remove the placed card from the player's hand
            if (currentPlayer === 'red') {
                setRedPlayerCards(redPlayerCards.filter((card) => card !== selectedCard));
            } else {
                setBluePlayerCards(bluePlayerCards.filter((card) => card !== selectedCard));
            }
            // Capture adjacent cards based on values
            captureAdjacentCards(rowIndex, colIndex, selectedCard);

            if(isBoardFull()){
                const result = determineWinner();
                setWinner(result);
            }
            else{
                //Reset the selected card and switch turns
                setSelectedCard(null);
                setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red');
            }
        }
    };

    const captureAdjacentCards = (row,col,card) => {
        const directions = [
            { row: -1, col: 0, checkValue: 'top', compareValue: 'bottom' }, // Up
            { row: 1, col: 0, checkValue: 'bottom', compareValue: 'top' },   // Down
            { row: 0, col: -1, checkValue: 'left', compareValue: 'right' },  // Left
            { row: 0, col: 1, checkValue: 'right', compareValue: 'left' },   // Right
        ];

        const updatedBoard = [...board];
        for (const { row: rowDir,   col: colDir, checkValue, compareValue } of directions) {
            const newRow = row + rowDir;
            const newCol = col + colDir;

            // Validation check for adjacent cell
            if(newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3 ) {
                const adjacentCard = updatedBoard[newRow][newCol];

                // If there is a card in the adjacent cell, and it belongs to the opponent
                if(adjacentCard && adjacentCard.owner !== currentPlayer) {
                    // Compare card values based on direction
                    if(card[checkValue] > adjacentCard[compareValue]) {
                        updatedBoard[newRow][newCol] = { ...adjacentCard, owner: currentPlayer };
                    }
                }
            }
        }
        setBoard(updatedBoard); // Update the board with captured cards
    };
    const isBoardFull = () => {
        return board.every(row => row.every(cell => cell !== null)); // Checks if all cells are filled
    };
    const determineWinner = () => {
        let redCount = 0;
        let blueCount = 0;

        board.forEach(row => {
            row.forEach(cell => {
                if (cell) {
                    if (cell.owner === 'red') redCount++;
                    else if (cell.owner === 'blue') blueCount++;
                }
            });
        });

        if (redCount > blueCount) {
            return "Red Player Wins!";
        } else if (blueCount > redCount) {
            return "Blue Player Wins!";
        } else {
            return "It's a Tie!";
        }
    };

    return (
        <div className="App">
            <h1>3x3 Card Game Board</h1>
            {winner && <h2 className="winner-message">{winner}</h2>}
            <h2>Current Player: <span className={currentPlayer}>{currentPlayer.toUpperCase()}</span>
            </h2>


            {/* Game Container to hold the red player, board, and blue player */}
            <div className="game-container">

                {/* Red Player's Cards Container */}
                <div className="players-cards-container red-player">
                    <h2>Red Player's Cards</h2>
                    {redPlayerCards.map((card, index) => (
                        <div key={index} onClick={() => handleCardClick(card, 'red')}>
                        <Card
                            top={card.top}
                            left={card.left}
                            right={card.right}
                            bottom={card.bottom}
                            owner={card.owner}
                            isFlipped={currentPlayer === 'blue'}
                            image = {card.image}
                        />
                        </div>
                    ))}
                </div>

                {/* Board Container */}
                <div className="board">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    className="cell"
                                    onClick={() => placeCardOnBoard(rowIndex, colIndex)}
                                >
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
                        <div key={index} onClick={() => handleCardClick(card, 'blue')}>
                            <Card
                                top={card.top}
                                left={card.left}
                                right={card.right}
                                bottom={card.bottom}
                                owner={card.owner}
                                isFlipped={currentPlayer === 'red'}
                                image = {card.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

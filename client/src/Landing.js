import React from "react";
import './Landing.css';

//Landing page to start the game
export const Landing = ({onStartGame}) => {
    return (
        <div className="landing-page">
            <header className="header">
                <h1>HIGH OR LOW GAME</h1>
            </header>
            <main className="main">
                <button onClick={onStartGame}>Start Game</button>
            </main>
        </div>
    );
}

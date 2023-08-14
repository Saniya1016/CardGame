import React, {useState} from "react";
import './Landing.css';

//Landing page to start the game
export const Landing = ({onStartGame}) => {

    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
      }

    return (
        <div className="landing-page">
            <header className="header">
                <h1>HIGH OR LOW GAME</h1>
            </header>
            <div>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <main className="main">
                <button onClick={onStartGame}>Start Game</button>
            </main>
        </div>
    );
}

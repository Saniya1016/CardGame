import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import './Landing.css';
import * as crud from './crud.js'

//Landing page to start the game
export const Landing = () => {

    const history = useHistory();
    const [name, setName] = useState(localStorage.getItem("username") || '');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    useEffect(() => {
        localStorage.setItem("username", name);
        console.log(localStorage.getItem("username"));
    }, [name]);

    const handleStartGame = async () => {
        console.log('Game Started!!');
        // set gameStarted state to true
        await crud.createUser(name);
        history.push('/start');
      }

    return (
        <div className="landing-page">
            <header className="header">
                <h1>HIGH OR LOW GAME</h1>
            </header>
            <div>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <main className="main">
                <button onClick={handleStartGame}>Start Game</button>
            </main>
        </div>
    );
}

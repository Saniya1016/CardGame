import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import './Landing.css';
import * as crud from './crud.js'

//Landing page to start the game
export const Landing = () => {

    //to keep track of the current page being rendered
    const history = useHistory();
    //the variable for the username 
    const [name, setName] = useState(localStorage.getItem("username") || '');

    //change name on key up event
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    //whenever name is being changed store the updated name to localStorage
    useEffect(() => {
        localStorage.setItem("username", name);
        localStorage.setItem("mount", JSON.stringify(true));
        console.log(localStorage.getItem("username"));
    }, [name]);

    //when the start button is pressed, the name is finally stored to database
    const handleStartGame = async () => {
        console.log('Game Started!!');
        // set gameStarted state to true
        const fetch_user = await crud.readUser(name);
        if (!fetch_user){
            const response = await crud.createUser(name);
            console.log("hello", response);
        }
        history.push('/start');
      }

    //render the components of the landing page
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

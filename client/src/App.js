import './App.css';
import {handleStartGame, Landing} from './Landing';
import React, {useState} from 'react';
import Start from './Start';

//Control react components
function App() {

  //gameStart is initialised to false initially
  const [gameStarted, setGameStarted] = useState(false);

  //callback function for when the 'start game' button on Landing page is pressed
  const handleStartGame = () => {
    console.log('Game Started!!');
    //set gameStarted state to true
    setGameStarted(true);
  }

  //if the gameStarted state is true render the Start page else render landing page
  return (
    <div className="App">
      {
        gameStarted? (
          <Start/>
        ) : (
          <Landing onStartGame={handleStartGame}/>
        )
      }
    </div>
  );
};

export default App;

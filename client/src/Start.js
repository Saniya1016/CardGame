import React, {useState, useEffect} from "react";
import d from './Cards';


const Start = () =>{
    
    const [deck, setDeck] = useState(d.get_cards_in_pile());
    const [current_card, setCurrentCard] = useState(d.get_current_card());
    const [previous_card, setPreviousCard] = useState(d.get_previous_card());
    const [score, setScore] = useState(0);


    useEffect(() => {
        console.log("Current card: ", current_card);
        console.log("deck: ", deck);
    }, [current_card, deck]);

    const handleGuess = (guess) => {
        d.choose_high_low(guess);
        if(d.draw_from_pile_is_success()){
            setScore(score+1);
        }
        setDeck(d.get_cards_in_pile());
        setCurrentCard(d.get_current_card());
        setPreviousCard(d.get_previous_card());
    }

    return (
        <div>
            <h2>Will The Next Card Be High OR LOW ?</h2>
            <p>Previous Card: {previous_card.number}</p>
            <p>Current Card: {current_card.number}</p>
            <p>Current Score: {score}</p>
            <button onClick={() => handleGuess("high")}>Higher</button>
            <button onClick={() => handleGuess("low")}>Lower</button>
        </div>
    );
}

export default Start;
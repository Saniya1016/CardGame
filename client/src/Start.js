import React, {useState, useEffect} from "react";
import d from './Cards';
import Card from './Card';


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
        } else{
            setScore(score-1);
        }
        setDeck(d.get_cards_in_pile());
        setCurrentCard(d.get_current_card());
        setPreviousCard(d.get_previous_card());
    }

    return (
        <div>
            <h1>Will The Next Card Be High OR LOW ?</h1>
            <h2>Current Score: {score}</h2>
            <div>
                <p>Previous Card: </p>
                <Card rank={previous_card.number} suit={previous_card.suit}/>
            </div>
            <div>
                <p>Current Card: </p>
                <Card rank={current_card.number} suit={current_card.suit}/>
            </div>
            <div>
                {
                    (deck.length > 0)?
                    (
                        <h2>Cards Remaining = {deck.length}</h2>
                    ):(
                        <h2>GAME OVER</h2>
                    )
                }
            </div>
            <button onClick={() => handleGuess("high")}>Higher</button>
            <button onClick={() => handleGuess("low")}>Lower</button>
        </div>
    );
}

export default Start;
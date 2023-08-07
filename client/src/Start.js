import React, {useState, useEffect} from "react";
import Cards from './Cards';


const Start = () =>{
    let d = new Cards();

    console.log(d.get_cards_in_pile().length);
    
    const [deck, setDeck] = useState([]);
    const [current_card, setCurrentCard] = useState({});
    const [previous_card, setPreviousCard] = useState({});
    const [score, setScore] = useState(0);
    console.log("Current card 1: ", current_card);
    console.log("deck 1: " , deck);

    useEffect(() => {
        d.shuffle();
        setDeck(d.get_cards_in_pile());
        setCurrentCard(d.get_current_card());
        setPreviousCard(d.get_previous_card());
    }, []);


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
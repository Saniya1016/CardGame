import React, {useState, useEffect} from "react";
import d from './Cards';
import Card from './Card';


const Start = () =>{
    
    //useState re-renders on refreshing page/ mounting and unmounting page
    const [deck, setDeck] = useState(JSON.parse(localStorage.getItem("deck")) || d.get_cards_in_pile());
    const [current_card, setCurrentCard] = useState(JSON.parse(localStorage.getItem("current_card")) || d.get_current_card());
    const [previous_card, setPreviousCard] = useState(JSON.parse(localStorage.getItem("previous_card")) || d.get_previous_card());
    const [allPrevious, setAllPrevious] = useState( JSON.parse(localStorage.getItem("allPrevious")) || []);
    const [showAllPrevious, setShowAllPrevious] = useState(JSON.parse(localStorage.getItem("showAllPrevious"))||false);
    const [flag, setFlag] = useState(localStorage.getItem("flag") || "Show");
    const [score, setScore] = useState(JSON.parse(localStorage.getItem("score"))|| 0);


    //set item in local storage whenever state changes
    useEffect(() => {
        localStorage.setItem("deck", JSON.stringify(deck) );
        localStorage.setItem("current_card", JSON.stringify(current_card));
        localStorage.setItem("previous_card", JSON.stringify(previous_card));
        localStorage.setItem("allPrevious", JSON.stringify(allPrevious));
        localStorage.setItem("showAllPrevious", JSON.stringify(showAllPrevious));
        localStorage.setItem("score", score);
        localStorage.setItem("flag", flag);;

        console.log("ls: " , localStorage.getItem("deck"));

    }, [current_card, deck, allPrevious, showAllPrevious, previous_card, score, flag]);

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
        setAllPrevious((prevAllPrevious) => [...prevAllPrevious, previous_card]);
    }

    const seeAllPreviousCards = () =>{
        const arrayItems = allPrevious.map((card, index)=>
            <Card key={index} rank={card.number} suit={card.suit}/>
        );

        return(
            <div>
                <h2>See Your Cards: </h2>
                <ul>{arrayItems}</ul>
            </div>
        );
    }

    const toggleAllPrevious = () => {
        if(flag === "Show"){
            setFlag("Hide");
        } else{
            setFlag("Show");
        }
        setShowAllPrevious(!showAllPrevious);
    }

    const handleRestart = () =>{
        d.reset_state();
        setDeck(d.get_cards_in_pile());
        setCurrentCard(d.get_current_card());
        setPreviousCard(d.get_previous_card());
        setScore(0);
        setAllPrevious([]);
        setShowAllPrevious(false);
        setFlag("Show");
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
            <button onClick={toggleAllPrevious}>{flag} All Previous Cards</button>
            {
                (showAllPrevious)?(
                    seeAllPreviousCards()
                ): 
                null
            }
            <button onClick={handleRestart}>RESTART GAME</button>
        </div>
    );
}

export default Start;
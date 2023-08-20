//Notes: useState re-renders on refreshing page/ mounting and unmounting page
//       using local storage for browser persistance
//       we cannot directly call async functions in useEffect since useEffect is supposed to be synchronous with the changes to variables

import React, {useState, useEffect} from "react";
import d from './Cards';
import Card from './Card';
import * as crud from './crud.js';


const Start = () => {

    const user_id = localStorage.getItem("username");  //get username from local storage (set on previous page)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user_info")) || {});  //read current user from database
    const [deck, setDeck] = useState(JSON.parse(localStorage.getItem("deck")) || d.get_cards_in_pile());  //store the current state of the cards deck
    const [current_card, setCurrentCard] = useState(JSON.parse(localStorage.getItem("current_card")) || d.get_current_card()); //get the card object we just drew
    const [previous_card, setPreviousCard] = useState(JSON.parse(localStorage.getItem("previous_card")) || d.get_previous_card()); // get the previous card that was drawn
    const [allPrevious, setAllPrevious] = useState( JSON.parse(localStorage.getItem("allPrevious")) || []); // see all the previous cards we drew
    const [showAllPrevious, setShowAllPrevious] = useState(JSON.parse(localStorage.getItem("showAllPrevious"))||false); // boolean to toggle b/w show and hide
    const [flag, setFlag] = useState(localStorage.getItem("flag") || "Show"); // toggle bw the display of show / hide button
    const [score, setScore] = useState(JSON.parse(localStorage.getItem("score"))|| 0); //current score
    const [gameOver, setGameOver] = useState(JSON.parse(localStorage.getItem("gameOver")) || false); //check if game is over i.e deck has no cards remaining
    const [store, setStore] = useState(JSON.parse(localStorage.getItem("store")) || false); // store flag to check if we have already stored the score once the game is over

    //on mount we check if this is the first time we are entering the game froom landing => if so we restart
    useEffect(() => {
        const f = JSON.parse(localStorage.getItem("mount"));
        if(f){
            handleRestart();
            localStorage.setItem("mount", JSON.stringify(false));
        }
    }, []);

    //to set current user info in local storage when we set username
    useEffect(() => {
        // Fetch user data and update the component state
        const fetchUserData = async () => {
            const usr = await crud.readUser(user_id);
            localStorage.setItem("user_info", JSON.stringify(usr));
            setUser(usr);
            
        };
    
        // Call the function to fetch user data when the component mounts
        fetchUserData();
      }, [user_id]);


    //update the users score in the database only once when the game is over
    //store in db
    // Update the users score in the database only once when the game is over
    useEffect(() => {
        const setScoreInDB = async () => {
            console.log(gameOver, user, !store);
            if (gameOver && user && user.score && !store) {
                user.score[0] = Math.max(user.score[0], score);
                const response = await crud.updateScore(user._id, user.score);
                setStore(true);
                localStorage.setItem("store", JSON.stringify(true));
                console.log("stored now: ", response);
            } else{
                console.log("no store");
            }
        };
        // Call setScoreInDB function when the game is over and deck length is 0
        setScoreInDB();
    }, [gameOver, user, store, score]);
        
    //set item in local storage whenever state changes - this way we dont have to keep setting localStorage everytime we make a change
    useEffect(() => {
        console.log("started ls");
        localStorage.setItem("deck", JSON.stringify(deck) );
        localStorage.setItem("current_card", JSON.stringify(current_card));
        localStorage.setItem("previous_card", JSON.stringify(previous_card));
        localStorage.setItem("allPrevious", JSON.stringify(allPrevious));
        localStorage.setItem("showAllPrevious", JSON.stringify(showAllPrevious));
        localStorage.setItem("score", score);
        localStorage.setItem("flag", flag);
        localStorage.setItem("gameOver", JSON.stringify(gameOver));
        console.log("ended ls");

    }, [current_card, deck, allPrevious, showAllPrevious, previous_card, score, flag, gameOver]);

    //handle the players next move /guess 
    const handleGuess = (guess) => {
        //if game is not over
        if(!gameOver){
            //set the users choice and determine wheteher it is a success
            console.log("started handle guess");
            d.choose_high_low(guess);
            if(d.draw_from_pile_is_success()){
                setScore(score+1); //+1 for success
            } else{
                setScore(score-1); //-1 for failure
            }
            
            setDeck(d.get_cards_in_pile()); //current state of deck
            setCurrentCard(d.get_current_card()); //set current card state
            setPreviousCard(d.get_previous_card()); //set previous card state
            setAllPrevious((prevAllPrevious) => [...prevAllPrevious, previous_card]);
            setGameOver(d.get_cards_in_pile().length === 0); //try not to make state dependent on another state
            console.log("ended handle guess");
        }
    }

    //make an array of the CSS card objects to render the previous cards
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

    //switch between show and hide button
    const toggleAllPrevious = () => {
        if(flag === "Show"){
            setFlag("Hide");
        } else{
            setFlag("Show");
        }
        setShowAllPrevious(!showAllPrevious);
    }

    //when the player resets the game - all the states are changed back to original state
    const handleRestart = () =>{
        d.reset_state();
        setDeck(d.get_cards_in_pile());
        setCurrentCard(d.get_current_card());
        setPreviousCard(d.get_previous_card());
        setScore(0);
        setAllPrevious([]);
        setShowAllPrevious(false);
        setFlag("Show");
        setGameOver(false);
        setStore(false);
        localStorage.setItem("store", JSON.stringify(false));
    }

    //Start function renders this html content
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
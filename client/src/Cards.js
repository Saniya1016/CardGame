//Cards class simply implements the logic of the game
class Cards{
    //set original state
    constructor(){
        this.cards = [];
        this.current_card = {};
        this.previous_card = {};
        this.high = false;
        for(let i=0;i<13;++i){
            let card = {'number': i+1, 'suit': "Diamonds"};
            this.cards.push(card);
        }
        for(let i=0;i<13;++i){
            let card = {'number': i+1, 'suit': "Spades"};
            this.cards.push(card);
        }   
    }

    //reset back to original to restart the game
    reset_state = () => {
        this.cards = [];
        this.current_card = {};
        this.previous_card = {};
        this.high = false;
        for(let i=0;i<13;++i){
            let card = {'number': i+1, 'suit': "Diamonds"};
            this.cards.push(card);
        }
        for(let i=0;i<13;++i){
            let card = {'number': i+1, 'suit': "Spades"};
            this.cards.push(card);
        }
        this.shuffle(); 
    }

    //get the current deck state
    get_cards_in_pile = () =>{
        return [...this.cards]; //shallow copy of array
    }


    //return the current card we drew
    get_current_card = () => {
        return this.current_card;
    }

    //return the previous card we drew
    get_previous_card = () => {
        return this.previous_card;
    }


    //shuffle all cards before begining the game
    shuffle = () => {
        const n = this.cards.length;
        for (let i = n - 1; i >= 1; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        this.current_card = this.cards.pop();
    }

    //set the players current choice
    choose_high_low = (choice) => {
        this.high = (choice === "high")? true : false;
    }

    //determine wheteher the players current chhoice was a success or not
    draw_from_pile_is_success = () => {
        if(this.cards.length > 0){
            console.log("drawing from pile");
            this.previous_card = this.current_card;
            this.current_card = this.cards.pop();
            // console.log(this.previous_card.number, this.current_card.number);
            return ((this.high && this.current_card.number >= this.previous_card.number) || (!this.high && this.current_card.number <= this.previous_card.number));
        }
        console.log("Game Over");
        return false;
        
    }

};

//we want to alwyas export the Cards object after shuffling
let d = new Cards();
d.shuffle();
export default d;








// ----------- TESTS ------------ //

// let deck = new Cards();
// deck.shuffle();
// console.log(deck.get_cards_in_pile());
// deck.choose_high_low("low");
// console.log(deck.draw_from_pile_is_success());
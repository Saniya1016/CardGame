
class Cards{
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

    get_cards_in_pile = () =>{
        return [...this.cards]; //shallow copy of array
    }

    get_current_card = () => {
        return this.current_card;
    }

    get_previous_card = () => {
        return this.previous_card;
    }

    shuffle = () => {
        const n = this.cards.length;
        for (let i = n - 1; i >= 1; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        this.current_card = this.cards.pop();
    }

    choose_high_low = (choice) => {
        this.high = (choice === "high")? true : false;
    }

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

let d = new Cards();
d.shuffle();
export default d;

// ----------- TESTS ------------ //

// let deck = new Cards();
// deck.shuffle();
// console.log(deck.get_cards_in_pile());
// deck.choose_high_low("low");
// console.log(deck.draw_from_pile_is_success());
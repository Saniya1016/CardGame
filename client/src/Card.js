import React from 'react';
import './Card.css';

const Card = ({ rank, suit }) =>{
    //${suit}
    return(
    <div className={`card ${suit}`}>
      <div className="card-rank">{rank}</div>
      <div className="card-suit">{suit}</div>
    </div>
    );
};

export default Card;
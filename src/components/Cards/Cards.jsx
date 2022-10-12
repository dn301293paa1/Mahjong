import React from 'react';
import './Cards.css';

const Cards = ({ arrayNums, cardOpen, cardMatch, startFlipped, clickCard }) => {
  return (
    <div className='cards'>
      {arrayNums.map((num, idx) => {
        let isFlipped = false;

        if (cardOpen.includes(idx)) {
          isFlipped = true;
        }
        if (cardMatch.includes(num.num)) {
          isFlipped = true;
          console.log(cardMatch);
        }

        return (
          <div
            key={idx}
            className={`card ${startFlipped}${isFlipped ? ' flipped' : ''}${
              cardMatch.includes(num.num) ? ' matched' : ''
            }`}
            onClick={() => clickCard(idx)}
          >
            <div>{startFlipped || isFlipped ? num.num : ''}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

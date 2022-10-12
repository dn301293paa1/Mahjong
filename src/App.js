import { useState, useEffect } from 'react';
import './App.css';

const initialArrayCards = [
  { id: 1, num: 1 },
  { id: 2, num: 2 },
  { id: 3, num: 3 },
  { id: 4, num: 4 },
  { id: 5, num: 5 },
  { id: 6, num: 6 },
  { id: 7, num: 7 },
  { id: 8, num: 8 },
  { id: 10, num: 10 },
  { id: 11, num: 11 },
  { id: 12, num: 12 },
  { id: 13, num: 13 },
  { id: 14, num: 14 },
  { id: 15, num: 15 },
  { id: 16, num: 16 },
  { id: 17, num: 17 },
];

const packOfCard = [...initialArrayCards, ...initialArrayCards];

const App = () => {
  const [arrayNums, setArrayNums] = useState([]);
  const [cardOpen, setCardOpen] = useState([]);
  const [CardMatch, setCardMatch] = useState([]);
  const [moves, setMoves] = useState(0);

  const randomShuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex -= 1;

      temporaryValue = array[currentIndex];

      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  useEffect(() => {
    setArrayNums(randomShuffle(packOfCard));
  });

  const clickCard = (index) => {
    // setCardOpen((opened) => [...opened, index]);
  };

  return (
    <div className='App'>
      <h1> Mahjong</h1>
      <div className='cards'>
        {arrayNums.map((num, idx) => {
          let isFlipped = false;

          if (cardOpen.includes(idx)) {
            isFlipped = true;
          }
          if (CardMatch.includes(num.id)) {
            isFlipped = true;
          }

          return (
            <div
              key={idx}
              className={`card ${isFlipped ? 'fliped' : ''}`}
              onClick={clickCard(idx)}
            >
              <div className='inner'>
                <div className='cardFront'>{num.id}</div>
                <div className='cardBack'>?</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

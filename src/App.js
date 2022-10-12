import { useState, useEffect } from 'react';
import Cards from './components/Cards/Cards.jsx';
import './App.css';

const randomNum = (length, maxNum) => {
  let arr = [];
  while (arr.length < length) {
    let r = Math.floor(Math.random() * maxNum) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

const generateArray = randomNum(16, 60);

const initialArrayCards = generateArray.map((elem, idx) => {
  return { num: elem };
});

const coupleInitialArrayCards = [...initialArrayCards, ...initialArrayCards];

const generateId = randomNum(
  coupleInitialArrayCards.length,
  coupleInitialArrayCards.length * 5
);

const createPacksOfCards = (arr, generateId) => {
  return arr.map((el, idx) => {
    return { id: generateId[idx], num: el.num };
  });
};

const packOfCard = createPacksOfCards(coupleInitialArrayCards, generateId);

const App = () => {
  const [arrayNums, setArrayNums] = useState([]);
  const [cardOpen, setCardOpen] = useState([]);
  const [cardMatch, setCardMatch] = useState([]);
  const [startFlipped, setStartFlipped] = useState('flipped');

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

    setTimeout(() => setStartFlipped(''), 5000);
  }, []);

  const clickCard = (index) => {
    setCardOpen((opened) => [...opened, index]);
  };

  useEffect(() => {
    if (cardOpen < 2) {
      return;
    }

    const firstMatched = arrayNums[cardOpen[0]];
    const secondMatched = arrayNums[cardOpen[1]];
    if (
      secondMatched &&
      firstMatched.num === secondMatched.num &&
      firstMatched.id !== secondMatched.id
    ) {
      setCardMatch([...new Set([...cardMatch, firstMatched.num])]);
    }
    if (cardOpen.length === 2) {
      setTimeout(() => setCardOpen([]), 1500);
    }
  }, [cardOpen]);

  return (
    <div className='App'>
      <h1>Mahjong</h1>
      <Cards
        arrayNums={arrayNums}
        cardOpen={cardOpen}
        cardMatch={cardMatch}
        startFlipped={startFlipped}
        clickCard={clickCard}
      />
    </div>
  );
};

export default App;

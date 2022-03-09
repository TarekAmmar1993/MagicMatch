import './App.css'
import {useEffect, useState} from "react";
import SingleCard from "./components/singleCard";

let cardImages=[
    {"src": 'img/helmet-1.png',matched:false},
    {"src": "img/potion-1.png",matched:false},
    {"src": "img/ring-1.png",matched:false},
    {"src": "img/scroll-1.png",matched:false},
    {"src": "img/shield-1.png",matched:false},
    {"src": "img/sword-1.png",matched:false}
]

function App() {
    const [cards,setCards] = useState([]);
    const [turns,setTruns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled,setDisabled] = useState(false);

    useEffect(() => {

        if(choiceOne && choiceTwo){
            setDisabled(true);
            if(choiceOne.src === choiceTwo.src){
                choiceOne.matched = true;
                choiceTwo.matched = true;
            }
            //console.log(choiceOne.src +"vs: "+choiceTwo.src)
            setTimeout(() => resetTurn(),1000);
        }
    },[choiceOne,choiceTwo])

    //start the game automatically
    useEffect(() =>{
        shuffleCards()
    },[])


    const shuffleCards = () => {
        const shuffledCards = [...cardImages,...cardImages]
            .sort(() => Math.random()-0.5)
            .map((card) =>({...card,id:Math.random()}))
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTruns(0);

    }
    //handle choice
    const handleChoice =(card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    //reset choices
    const resetTurn = () =>{
        setChoiceOne(null);
        setChoiceTwo(null);
        setTruns(previousTurn => previousTurn +1)
       setDisabled(false);
    }
    //start the game automatically
    useEffect(() =>{
        shuffleCards()
    },[])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
          {cards.map(card =>(
              <SingleCard key={card.id}
                          card={card}
                          handleChoice = {handleChoice}
                          flipped = {card === choiceOne || card === choiceTwo || card.matched}
                          disabled ={disabled}
              />
          ))
          }
      </div>
        <p>Turn: {turns}</p>
    </div>
  );
}

export default App
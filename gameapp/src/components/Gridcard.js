import React,{useState} from 'react';
import Card from './CardItems';

function Cards(){
    const [Cards,setCards]= useState(shuffleCards());
    const [flippedCards,setFlippedCards]=useState([]);

    function shuffleCards(){
        const logos =[ '01','02','03','04','05','06','07','08'];
        const cardSet= [...logos,...logos].map((logo)=>({
            id:Math.random(),
            name:logo,
            flipped:false,
            matched:false,
        }));
        return cardSet.sort(()=>Math.random()-0.5);

    }

    //flipped part
    const handleFlip =(card)=>{
        if (flippedCards.length===2|| card.flipped||card.matched)return;


            const updatedCards =cards.map((c)=>

                c.id===card.id ?{
                    ...c,flipped:true
                }:c);
                setCards(updatedCards);

                const newFlipped=[...flippedCards,cards];
                setFlippedCards(newFlipped);
                if(newFlipped.length===2){
                    const[first,second]= newFlipped;
                    if(first.name===second.name){
                        const matchedCards=updatedCards.map((c)=>
                            c.name===first.name ?{
                                ...c,matched:true}:c
                        );

                        setTimeout(()=>{
                            setCards(matchedCards);
                            setFlippedCards([]);
                        },500);
                    }else{
                        setTimeout(()=>{
                            const resetCards =updatedCards.map((c)=>
                                c.id===first.id||c.id===second.id?{
                                    ...c,flipped:false}:c);
                                    setCards(resetCards);
                                    setFlippedCards([]);},1000);

                                }
                            }
                        }
                    };
                const resetGame=()=>{
                    setCards(shuffleCards());
                    setFlippedCards([]);  
                };
            
            return(
                <div>
                    <div className='cards-grid'>
                    {Cards.map(card)=>(
                        <Card
                        key={card.id}
                        card={card}
                        onFlip={()=>handleFlip(card)}
                        />
                    ))}

                    </div>
                    <button className='reset-button' onClick={resetGame}>reset</button>
                </div>



            );
        

    
export default Cards;

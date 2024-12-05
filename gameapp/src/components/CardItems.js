import React from 'react';
function Card(card,onFlip){
    return(
        <div className={`card ${card.flipped ? 'flipped':''}`}  onClick={{onFlip}}>
 <div className='card-inner'>

    <div className='card-front'>
        <img src={`/imgages/${card.name}.png`}
        alt={card.name}
        className='card-image'/>

    </div>
    <div className='card-block'></div>
 </div>
        </div>
    );

}
export default Card;

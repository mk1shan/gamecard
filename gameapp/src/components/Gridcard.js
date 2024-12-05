import React, { useState } from "react";
import Card from "./CardItems";

function Cards() {
    // State for cards and flipped cards
    const [cards, setCards] = useState(shuffleCards());
    const [flippedCards, setFlippedCards] = useState([]);

    // Function to shuffle cards
    function shuffleCards() {
        const logos = ['01', '02', '03', '04', '05', '06', '07', '08'];
        const cardSet = [...logos, ...logos].map((logo) => ({
            id: Math.random(),
            name: logo,
            flipped: false,
            matched: false,
        }));
        return cardSet.sort(() => Math.random() - 0.5);
    }

    // Function to handle card flipping
    const handleFlip = (card) => {
        if (flippedCards.length === 2 || card.flipped || card.matched) return;

        // Flip the selected card
        const updatedCards = cards.map((c) =>
            c.id === card.id ? { ...c, flipped: true } : c
        );
        setCards(updatedCards);

        const newFlipped = [...flippedCards, card];
        setFlippedCards(newFlipped);

        // Check for match if two cards are flipped
        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;

            if (first.name === second.name) {
                // Mark cards as matched
                const matchedCards = updatedCards.map((c) =>
                    c.name === first.name ? { ...c, matched: true } : c
                );

                setTimeout(() => {
                    setCards(matchedCards);
                    setFlippedCards([]);
                }, 500);
            } else {
                // Reset flipped cards if not matched
                setTimeout(() => {
                    const resetCards = updatedCards.map((c) =>
                        c.id === first.id || c.id === second.id
                            ? { ...c, flipped: false }
                            : c
                    );
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    // Function to reset the game
    const resetGame = () => {
        setCards(shuffleCards());
        setFlippedCards([]);
    };

    // Render the cards and reset button
    return (
        <div>
            <div className="cards-grid">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        onFlip={() => handleFlip(card)}
                    />
                ))}
            </div>
            <button className="reset-button" onClick={resetGame}>
                Reset
            </button>
        </div>
    );
}

export default Cards;

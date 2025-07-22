// import React, { useState, useEffect } from "react";
// import "./Flashcard.css";

// export default function Flashcard({ card }) {
//   const [flipped, setFlipped] = useState(false);

//   useEffect(() => {
//     setFlipped(false); // Reset flip when a new card is shown
//   }, [card]);

//   return (
//     <div className="card-container" onClick={() => setFlipped(!flipped)}>
//       <div className={`card ${flipped ? "flipped" : ""}`}>
//         <div className="front">{card.question}</div>
//         <div className="back">{card.answer}</div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import "./Flashcard.css";

export default function Flashcard({ card, onFlip }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [card]);

  const handleClick = () => {
    if (!flipped && onFlip) onFlip();
    setFlipped(!flipped);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className={`card ${flipped ? "flipped" : ""}`}>
        <div className="front">{card.question}</div>
        <div className="back">{card.answer}</div>
      </div>
    </div>
  );
}
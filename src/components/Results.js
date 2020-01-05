import React from 'react';

const Results = ({score, playAgain}) => (
  <div className = 'scoreCard'>
    <div className = 'score'>Let's See what you got lol... You Scored {score} / 5 correct answers!</div>
    <button className = 'playBtn' onClick={playAgain}>Play again!</button>
  </div>
)
export default Results;






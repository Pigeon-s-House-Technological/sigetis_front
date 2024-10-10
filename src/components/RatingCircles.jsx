import React from 'react';

const RatingCircles = ({ puntuacion }) => {
  const maxPuntuacion = 10; // Define el máximo de puntuación
  const circles = [];

  for (let i = 1; i <= maxPuntuacion; i++) {
    circles.push(
      <span
        key={i}
        style={{
          display: 'inline-block',
          width: '20px',
          height: '20px',
          margin: '0 5px',
          borderRadius: '50%',
          backgroundColor: i <= puntuacion ? '#215f88' : '#ccc',
        }}
      ></span>
    );
  }

  return <div>{circles}</div>;
};

export default RatingCircles;
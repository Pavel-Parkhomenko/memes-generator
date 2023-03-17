import React from 'react';
import face from '../images/Troll Face.png';

export default function Header() {
  return (  
    <div className='header--container'>
      <div className='title--container'>
        <img src={face} alt="" className='face--img'></img>
        <h1>Meme Generator</h1>
      </div>
    </div>
  );
}
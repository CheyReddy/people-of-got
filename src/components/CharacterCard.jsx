import React from 'react'
import "../css/CharacterCard.css";

function CharacterCard({character}) {
  return (
    <div className='character-card'>
        <div className="character-poster">
          
        </div>
        <div className="character-info">
            <h2>{character.name}</h2>
            <p><strong>Titles: </strong>{character.titles?.join(", ")}</p>
            <p><strong>Culture: </strong>{character.culture}</p>
        </div>
    </div>
  )
}

export default CharacterCard

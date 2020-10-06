import React from 'react';

const Hangman = (props) => {
    return(
        <img src={require(`../images/hangManPosition${props.pos}.png`)} alt="Hangman"></img>
    );
}

export default Hangman;
import React from 'react';

const Guess = (props) => {
    return(
        <div>
            <div>
                <h3 style={{display:"inline-block"}}>Your Letter Guess is: </h3>
                <input id="letter-input" size="1" maxLength="1" style={{display: "inline-block", marginLeft: "15px"}} onChange={(e) => props.setLetter(e.target.value)}></input>
            </div>
            <button style={{marginTop:"3%"}} className="button" onClick={() => props.checkLetter()}>Attempt</button>
        </div>
    );
}

export default Guess
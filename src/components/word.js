import React from 'react';
import {v4 as uuidv4} from 'uuid';

const Word = (props) => {
    return(
        <div>
            <h3 style={{display: "inline-block"}}>Your Word is:  </h3>
            {props.letterStyle.map((x) => {
                return <div key={uuidv4()} style={{display:"inline-block"}}>
                            <div style={{paddingLeft:"10px", display:"inline-block"}}/> 
                            <h3 style={x.style}>{x.letter}</h3>
                        </div>
            })}
        </div>
    );
}

export default Word;
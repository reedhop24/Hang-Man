import React from 'react';
import {v4 as uuidv4} from 'uuid';

const InvalidLetters = (props) => {
    return(
        <div style={{marginTop:"50px", height: "300px", width: "200px", border: "2px solid", padding: "15px", textAlign:"center"}}>
            <p style={{color:"red"}}>Invalid Letters</p>
            <ol style={{color:"red", marginLeft:"20px"}}>
                {props.invalid.map((x) => <li key={uuidv4()}>{x}</li>)}
            </ol>
        </div>
    );
}

export default InvalidLetters;
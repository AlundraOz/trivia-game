import React from 'react';


const Button = (props) => {

    const isCorrect = props.answerShow === props.currentSong;

    return (
        <button 
            onClick={props.onClick} 
            className={"myButton button " + (isCorrect ? "green" : "red")}>
                {props.answerShow}
        </button>
    )
};


export default Button;
import React from "react"

export default function Check(props){
    
    return(
        <div className="checkButton" onClick={props.checkAnswers}> 
            Check Answers!
        </div>
    )
}
import React from "react"

export default function Result(props){
    return(
        <div className="result">
            <span>You got</span>
            <span>{props.result}</span>
            <span>right answers!</span>  
        </div>
    )
}
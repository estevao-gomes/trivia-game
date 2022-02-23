import React from "react"

export default function NewGame(props){
    return(
        <div className="newgame" onClick={props.toggle}>
                New Game!
        </div>
    )
}
import React from "react"

export default function NewGame(props){
    return(
        <div className={props.main ? "newgame" : "renew"} onClick={props.toggle}>
                New Game!
        </div>
    )
}
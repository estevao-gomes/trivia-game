import React from "react"


export default function Question(props){
    const[choices, setChoices] = React.useState(()=>{
        let value = props.QuestionData.incorrect_answers.length + 1
        let values = []
        for(let i = 0; i < value; i++){
            values.push(false)
        }
        return values
    })
    const[answers, setAnswers] = React.useState(()=>{
        return getAnswers()
    })


    React.useEffect(()=>{
        const newAnswers = getAnswers()
        setAnswers(newAnswers)}, [props.QuestionData]
    )

    React.useEffect(()=>{
        const values = getNAnswers()
        setChoices(values)
    }, [props.QuestionData])

    function getNAnswers(){
        let value = props.QuestionData.incorrect_answers.length + 1
        let values = []
        for(let i = 0; i < value; i++){
            values.push(false)
        }
        return values
    }

    function getAnswers(){
        const value = props.QuestionData.incorrect_answers.length
        let number = Math.floor(Math.random()*value)
        let newAnswers = []
        for(let i = 0; i < value; i++){
            const incorrect_answer = props.QuestionData.incorrect_answers[i]
            const correct_answer = props.QuestionData.correct_answer
            if(i !== number){
                newAnswers.push(incorrect_answer)
            }
            else{
                newAnswers.push(correct_answer)
                newAnswers.push(incorrect_answer)
            }
        }
        return newAnswers
    }

    function toggle(event){
        const id = parseInt(event.currentTarget.id)
        setChoices((oldChoices) => {
            const newChoices = oldChoices.map((oldChoice, index)=>{
               return id !== index ? false : !oldChoice
            })
            return newChoices
        })
    }

    const questions = choices.map((choice, index)=>{
        if(props.check){
            if(answers[index]===props.QuestionData.correct_answer){
                return(
                <div className="setAnswer" id={index} style={{backgroundColor: "green"}} key={index}>
                    <h4>{answers[index]}</h4>
                </div>
                )
            }else{
                if(choices[index]){
                    return(
                        <div className={choice ? "setAnswer" : "answer"} id={index} style={{backgroundColor: "red"}} key={index}>
                            <h4>{answers[index]}</h4>
                        </div>
                )}else{
                    return(
                        <div className="answer" id={index} key={index}>
                            <h4>{answers[index]}</h4>
                        </div>
                    )
                }
            }
        }else{
            return(
                <div className={choice ? "setAnswer" : "answer"} onClick={toggle} id={index} key={index}>
                    <h4>{answers[index]}</h4>
                </div>
            )
        }
    })

    console.log("I'm reloading")
    
    return(
        <div className="question">
            <h3>{props.QuestionData.question}</h3>
            {questions}
        </div>
    )
}
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
    const [correctAnswerPos, setCorrectAnswerPos] = React.useState(0)
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

    React.useEffect(()=>{
        const choice = choices[correctAnswerPos] ? true : false
        props.getResults(choice)
    }, [props.check])

    function getNAnswers(){
        let value = props.QuestionData.incorrect_answers.length + 1
        let values = []
        for(let i = 0; i < value; i++){
            values.push(false)
        }
        return values
    }      

    function replaceSymbols(string){
        const replacers = {
            '&quot;': '"',
            '&#039;': '\'',
            '&amp;': '&'
        }
        string = string.replace(/[&].{3}[;]/g, (match)=>replacers[match])
        return string.replace(/[&].{4}[;]/g, (match)=>replacers[match])
    }

    function getAnswers(){
        const value = props.QuestionData.incorrect_answers.length
        let number = Math.floor(Math.random()*value)
        setCorrectAnswerPos(number)
        let newAnswers = []
        for(let i = 0; i < value; i++){
            const incorrect_answer = replaceSymbols(props.QuestionData.incorrect_answers[i])
            const correct_answer = replaceSymbols(props.QuestionData.correct_answer)
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
                <div className="setAnswer" id={index} style={{backgroundColor: "green"}}>
                    <h4>{answers[index]}</h4>
                </div>
                )
            }else{
                if(choices[index]){
                    return(
                        <div className={choice ? "setAnswer" : "answer"} id={index} style={{backgroundColor: "red"}}>
                            <h4>{answers[index]}</h4>
                        </div>
                )}else{
                    return(
                        <div className="answer" id={index}>
                            <h4>{answers[index]}</h4>
                        </div>
                    )
                }
            }
        }else{
            return(
                <div className={choice ? "setAnswer" : "answer"} onClick={toggle} id={index}>
                    <h4>{answers[index]}</h4>
                </div>
            )
        }
    })
    
    return(
        <div className="question">
            <h3>{replaceSymbols(props.QuestionData.question)}</h3>
            {questions}
        </div>
    )
}
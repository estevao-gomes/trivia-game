import React from "react"

import './App.css';
import Title from './components/Tittle';
import NewGame from './components/NewGame';
import Question from './components/Question';

// import QuestionData from "./QuestionData.js"
import Check from "./components/Check";

function App() {
  const [main, setMain] = React.useState(true)
  const [check, setCheck] = React.useState(false)
  const [QuestionData, setQuestions] = React.useState([])

  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [main])

  console.log(QuestionData)

  function checkAnswers(){
    setCheck((oldCheck)=>!oldCheck)    
  }

  const questions = QuestionData.map((question, index) => {
      return <Question QuestionData={question} check={check} key={index}/>
  })

  function changePage(){
    setMain((oldMain)=>!oldMain)
    setCheck(false)
  }

  if(main){
    return (
      <div className="App">
        <Title />
        <NewGame toggle={changePage}/>
      </div>
    );
  }else{
    return(
      <div className="App">
        {questions}
        {check ? <NewGame toggle={changePage}/> : <Check checkAnswers={checkAnswers}/>}
      </div>
    )
  }
  
}

export default App;

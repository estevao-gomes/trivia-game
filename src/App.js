import React from "react"

import './App.css';
import Title from './components/Tittle';
import NewGame from './components/NewGame';
import Question from './components/Question';
import Result from "./components/Result";

import Check from "./components/Check";


function App() {
  const [main, setMain] = React.useState(true)
  const [check, setCheck] = React.useState(false)
  const [QuestionData, setQuestions] = React.useState([])
  const [result, setResult] = React.useState(0)


  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [main])

  function checkAnswers(){
    setCheck((oldCheck)=>!oldCheck)    
  }

  const questions = QuestionData.map((question, index) => {
      return <Question QuestionData={question} check={check} key={index} getResults={getResults}/>
  })

  function changePage(){
    setMain((oldMain)=>!oldMain)
    setCheck(false)
    setResult(0)
  }

  function getResults(choice){
    setResult((oldResult) => choice ? oldResult+1 : oldResult)
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
        {check && <Result result={result}/>}
        {check ? <NewGame toggle={changePage}/> : <Check checkAnswers={checkAnswers}/>}
      </div>
    )
  }
}

export default App;

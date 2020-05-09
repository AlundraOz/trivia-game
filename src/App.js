import React from 'react';
import './App.css';
import Question from './components/Question'
import AnswerOption from './components/Buttons';
import Shuffle from 'shuffle-array'
import Button from './components/Buttons';

class App extends React.Component {
  state = {
    loading: true,
    data: [],
    answer: []
  };

  async componentDidMount() {
    const url = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
    const response = await fetch(url);
    const data = await response.json();
    
       
    var correctAnswer =  data.results[0].correct_answer
    var wrongAnswers = data.results[0].incorrect_answers
    console.log(wrongAnswers)
    /*const mixAnswers = correctAnswer.push(wrongAnswers)*/
      
      this.setState({ 
        data: data.results[0] ,
        loading: false,
        });
  }


 render() {
   return(
     <div>
       <Question content={this.state.data.question}/>
       <Button answerShow = {this.state.answer}/>
     </div>
   )
 }
}



export default App

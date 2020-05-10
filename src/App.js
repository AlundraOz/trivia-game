import React from 'react';
import './App.css';
import Question from './components/Question'



class App extends React.Component {
  state = {
    loading: true,
    data: [],
    correctAnswer: [],
    endGame: false,
    current_Index: 0,
    answers: [],
    userAnswer: [],
    score: 0,
  };

  async componentDidMount() {
    const url = "https://opentdb.com/api.php?amount=10&category=15&type=boolean";
    const response = await fetch(url);
    const data = await response.json();
    let current_Index = this.state.current_Index;
    let {currentIndex} = this.state
      this.setState({ 
        data: data.results[current_Index] ,
        loading: false,
        questions: data.results,
        rightAnswer: data.results[current_Index].correct_answer,
        })
        console.log(data)
        console.log(this.state.questions);
  }

 selectOption  = (event) => {
  const {rightAnswer} = this.state
  console.log(rightAnswer)
  console.log(event.target.id)
  /* Guardamos respuesta del usuario */
  var response = (event.target.id === "btn-true") ? "True" : "False";
  
  console.log(response)
  /* Revisamos si la respuesta es correcta y sumamos un puntito */
  if(rightAnswer == response){
    console.log('iesaaa ganaste');
    this.setState ({score: this.state.score + 1})
  }
  /*mientras que el indice sea menor igual a 10 index+1*/
  console.log(this.state.current_Index)
  if (this.state.current_Index < 9) {    
    /* questions /* las preguntas 10 */
    /* data /*es la pregunta actual*/
    /* rightAnswer: data.results[current_Index].correct_answer, */
    this.setState({
      current_Index: this.state.current_Index +1,
      data: this.state.questions[this.state.current_Index],
      rightAnswer: this.state.questions[this.state.current_Index].correct_answer
      
    })
    /*
    let myIndex = this.state.currentIndex++; 
    this.setState({currentIndex: myIndex})  
    */
  }else{
    //mostrar puntuacion! end game --- todos felices
    console.log(this.state.score)

  }
  console.log(this.state.current_Index)
 }

 nextQuestion = () => {
  const {rightAnswer} = this.state
  (rightAnswer) ? 
    this.setState({ score: this.state.score + 1, 
      current_Index: this.state.currentIndex + 1 })
               : this.setState({current_Index: this.state.current_Index + 1})
 
    }
 render() {
   return(
     <div>
       <Question content={this.state.data.question}/>
       <button id="btn-true" onClick= {this.selectOption}>True</button>
       <button id="btn-false" onClick={this.selectOption}>False</button>
     </div>
   )
 }
}



export default App

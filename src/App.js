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
    score: 0,
  };


  //data.results[current_Index]
  async componentDidMount() {
    const url = "https://opentdb.com/api.php?amount=10&category=15&type=boolean";
    const response = await fetch(url);
    const data = await response.json();
    let current_Index = this.state.current_Index;
    for (var i = 0; i < data.results.length; i+=1) {
      data.results[i]['question'] = this.decodeHtml(data.results[i]['question']);
    } 
    this.setState({ 
        data: data.results[current_Index] ,
        loading: false,
        questions: data.results,
        rightAnswer: data.results[current_Index].correct_answer,
        current_Index: this.state.current_Index + 1
        })
 //      console.log(data)
 //       console.log(this.state.questions);
  }

  decodeHtml = (texto_pregunta) => {
    let areaElement = document.createElement("textarea");
    areaElement.innerHTML = texto_pregunta;
    return areaElement.value;
  }

 selectOption  = (event) => {
  const {rightAnswer} = this.state
 // console.log(rightAnswer)
 // console.log(event.target.id)
  /* Guardamos respuesta del usuario */
  var response = (event.target.id === "btn-true") ? "True" : "False";
  
  //console.log(response)
  /* Revisamos si la respuesta es correcta y sumamos un puntito */
  if(rightAnswer === response){
    console.log('iesaaa ganaste');
    this.setState ({score: this.state.score + 1})
    //añadir clase success al boton
  }else{
    //añadir clase error al boton
  }

  //set time out -> para ejecutar la siguiente pregunta si corresponde 
  setTimeout( 
    function() {
      this.nextQuestion();
    }.bind(this), 2000);
  
 }

 nextQuestion = () => {
    /*mientras que el indice sea menor igual a 10 index+1*/
  // console.log(this.state.current_Index)
  if (this.state.current_Index < 9) {    
    /* questions /* las preguntas 10 */
    /* data /*es la pregunta actual*/
    /* rightAnswer: data.results[current_Index].correct_answer, */
    let index = this.state.current_Index + 1;

    this.setState({
      current_Index: index,
      //data pasa a ser la siguiente pregunta (siguiente posicion de indice)
      data: this.state.questions[this.state.current_Index],
      rightAnswer: this.state.questions[this.state.current_Index].correct_answer
    })
  }else{
    //mostrar puntuacion! end game --- todos felices
    console.log(this.state.score)
  }
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

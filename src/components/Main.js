import React from 'react';
import Question from './Question';
import './Main.scss';

class Main extends React.Component {
  state = {
    loading: true,
    data: [],
    rightAnswer: [],
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
  /* Deshabilitamos los botones para impedir el click y el bug */
  document.getElementById("btn-true").disabled = true;
  document.getElementById("btn-false").disabled = true;
  //console.log(response)
  /* Revisamos si la respuesta es correcta y sumamos un puntito */
  if(rightAnswer === response){
    console.log('iesaaa ganaste');
    this.setState ({score: this.state.score + 1})
    //añadir clase success al boton
    event.target.classList.add("green");
  }else{
    //añadir clase error al boton
    event.target.classList.add("red");
    
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
    console.log("score:"+this.state.score)
  }else{
    //mostrar puntuacion! end game --- todos felices
    console.log(this.state.score)
  }
  document.getElementById("btn-true").classList.remove("green");
  document.getElementById("btn-true").classList.remove("red");
  document.getElementById("btn-false").classList.remove("red");
  document.getElementById("btn-false").classList.remove("green");
  document.getElementById("btn-true").disabled = false;
  document.getElementById("btn-false").disabled = false;
 }

 render() {
   return(
     <div className="main">
       <h1 className="main-title">Trivia Game!</h1>
       <Question content={this.state.data.question}/>
       <div className="buttons">
        <button id="btn-true" onClick= {this.selectOption}>True</button>
        <button id="btn-false"  onClick={this.selectOption}>False</button>
       </div>
     </div>
   )
 }
}


export default Main

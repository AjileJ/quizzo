import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import quizService from './quizService';
import QuestionBox from './components/QuestionBox';
import Results from './components/Results';

class Quizzo extends Component {
  state = {
    questionsBank: [],
    score: 0,
    responses: 0
  };
  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionsBank: question
      });
    });
  };
  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1 
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    })
  };
  playAgain = () => {
    this.getQuestions();
    this.setState({ 
      score: 0,
      responses: 0
    })
  }
  componentDidMount() {
    this.getQuestions();
  }
  render(){
    return (
      <div className = 'container'>
        <div className = 'title'>POP QUIZ: AIM FOR A 5 !</div>
        {this.state.questionsBank.length > 0 && 
        this.state.responses < 5 && 
          this.state.questionsBank.map(
            ({question, answers, correct, questionId}) => (
              <QuestionBox 
              question= {question} 
              options= {answers} 
              key= {questionId}
              selected= {answer => this.computeAnswer(answer, correct)}
              />
            )
          )}

          {this.state.responses === 5 ? (<Results score= {this.state.score} playAgain={this.playAgain} />) : null}
      </div>
    );
  }
}


ReactDOM.render(<Quizzo />, document.getElementById("root"));
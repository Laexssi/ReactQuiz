import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz'

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isFinished: false,
            activeQuestion: 0,
            answerResults: {}, // { [id]: 'correct' / 'incorrect'}
            answerStatus: null, // { [id]: 'correct' / 'incorrect'}
            quiz: [
                {
                    question: "What is the name of Newark NHL team?",
                    correctAnswerId: 3,
                    id: 1,
                    answers: [
                        { text: 'Coyotes', id: 1 },
                        { text: 'Stars', id: 2 },
                        { text: 'Devils', id: 3 },
                        { text: 'Thrashers', id: 4 }
                    ]
                },
                {
                    question: "What title was NOT used in Metal Gear series?",
                    correctAnswerId: 2,
                    id: 2,
                    answers: [
                        { text: 'Guns of Partiots', id: 1 },
                        { text: 'Modern Warfare', id: 2 },
                        { text: 'Revengeance', id: 3 },
                        { text: 'Ground Zeroes', id: 4 }
                    ]
                }
            ],
        }
        this.onAnswerClickHandler = this.onAnswerClickHandler.bind(this);
        this.isQuizFinished = this.isQuizFinished.bind(this);
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerStatus: null,
            isFinished: false,
            answerResults: {}
        })
    }
    onAnswerClickHandler = (answerId) => {

        if (this.state.answerStatus) {
            const key = Object.keys(this.state.answerStatus)[0];
            if (this.state.answerStatus[key] === 'correct') return;
        }

        const correctAnswer = this.state.quiz[this.state.activeQuestion].correctAnswerId;
        const results = this.state.answerResults;
        const question = this.state.quiz[this.state.activeQuestion]

        if (answerId === correctAnswer) { 
          if (!results[question.id]) {
              results[question.id] = 'correct'
          }
            this.setState({
                answerStatus: { [answerId] : 'correct'},
                answerResults: results
            })
          
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log("out of qusetions");
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState((state) => ({
                        activeQuestion: state.activeQuestion + 1,
                        answerStatus: null,
                        
                    }))
                }
                console.log(this.state)
                window.clearTimeout(timeout)
            }, 1000);

           
        } else {
            results[question.id] = 'incorrect'
            this.setState({
                answerStatus: {[answerId] : 'incorrect'},
                answerResults: results
            })
            console.log("incorrect answer");
        }
        
   
       

    }
    render() {
        return (
            <div className={classes.Quiz}>


                <div className={classes.QuizWrapper}>
                <h1>Choose answer</h1>
                    {this.state.isFinished
                    ?<FinishedQuiz 
                        results={this.state.answerResults}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                    />
                    :<ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        status = {this.state.answerStatus}

                    /> }
                    
                </div>

            </div>
        )
    }
}
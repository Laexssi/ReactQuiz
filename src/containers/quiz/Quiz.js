import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import {
  fetchQuizById,
  quizAnswerClick,
  quizRetry
} from "../../store/actions/quiz";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.quizRetry();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Choose answer</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.answerResults}
              quiz={this.props.quiz}
              onRetry={this.props.quizRetry}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              status={this.props.answerStatus}
            />
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerResults: state.quiz.answerResults,
    answerStatus: state.quiz.answerStatus,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    quizRetry: () => dispatch(quizRetry())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

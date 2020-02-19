import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "./AnswersList/AnswersList.js";
const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.answerNumber}</strong>&nbsp;
        {props.question}
      </span>

      <small>
        {props.answerNumber}&nbsp;of&nbsp;{props.quizLength}
      </small>
    </p>
    <AnswersList
      answers={props.answers}
      onClick={props.onClick}
      status={props.status}
    />
  </div>
);

export default ActiveQuiz;

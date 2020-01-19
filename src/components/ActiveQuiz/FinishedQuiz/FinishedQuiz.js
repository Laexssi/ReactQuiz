import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = props => {
  const succesCount = Object.keys(props.results).reduce((acc, key) => {
    if (props.results[key] === "correct") acc++;
    return acc;
  }, 0);
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((item, index) => {
          const cls = [
            "fa",
            props.results[item.id] === "incorrect" ? "fa-times" : "fa-check",
            classes[props.results[item.id]]
          ];

          return (
            <li key={index}>
              <strong>{index + 1}</strong>&nbsp;
              {item.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}

        {/* <li>
                    <strong>1. </strong>
                    ??????
                    <i className = {'fa - fa-times ' + classes.incorrect} />
                </li>
                <li>
                    <strong>1. </strong>
                    ??????
                    <i className = {'fa - fa-check ' + classes.correct} />
                </li> */}
      </ul>

      <p>
        {succesCount} correct answers out of {props.quiz.length} questions
      </p>

      <div>
        <Button onClick={props.onRetry}>Repeat</Button>
        <Link to="/">
          <Button>try another quiz</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;

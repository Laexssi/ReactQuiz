import React from "react";
import classes from "./QuestionList.module.css";

const QuestionList = props => {
  const { quiz, currentQuiz } = props;
  const cls = [classes.QuestionList];

  return (
    <div className={cls.join(" ")}>
      <ul>
        {Object.keys(quiz).map((_, index) => {
          const active = currentQuiz === index ? classes.active : "";

          return (
            <li key={index} onClick={props.onClick} className={active}>
              {+index + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionList;

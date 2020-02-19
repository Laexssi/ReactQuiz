import React from "react";
import classes from "./QuestionList.module.css";

const QuestionList = props => {
  const { quiz, currentQuiz } = props;
  const cls = [classes.QuestionList];

  return (
    <div className={cls.join(" ")}>
      <ul>
        {Object.keys(quiz).map((key, index) => {
          const active = currentQuiz === index ? classes.active : "";

          return (
            <li key={index} onClick={props.onClick} className={active}>
              {+key + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionList;

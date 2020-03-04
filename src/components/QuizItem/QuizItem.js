import React from "react";
import Button from "../UI/Button/Button";
import classes from "./QuizItem.module.css";
import { NavLink } from "react-router-dom";

export const QuizItem = ({ name, number, author, length, id }) => {
  return (
    <div className={classes.QuizItem}>
      <ul>
        <li>Quiz # {number}</li>
        <li>
          <h3> {name}</h3>
        </li>

        <li>
          Quiz by <b>{author}</b>
        </li>
        <li>
          <NavLink to={{ pathname: `/list/${id}`, name }}>
            <i className={`fa fa-edit`}></i> Edit Quiz
          </NavLink>
        </li>
      </ul>
      <NavLink to={`/quiz/${id}`}>
        <Button type="primary">Start Quiz</Button>
      </NavLink>
    </div>
  );
};

export default QuizItem;

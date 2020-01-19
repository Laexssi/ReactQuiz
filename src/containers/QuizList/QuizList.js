import React, { Component } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";

export default class QuizList extends Component {
  rendreQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={`/quiz/${quiz}`}>Quiz #{quiz}</NavLink>
        </li>
      );
    });
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <h1>List of quizes</h1>
        <ul>{this.rendreQuizes()}</ul>
      </div>
    );
  }
}

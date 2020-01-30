import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import classes from "./QuizList.module.css";
import { fetchQuizes } from "./../../store/actions/quiz";

class QuizList extends Component {
  rendreQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>
            <h2>{quiz.name}</h2>
          </NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>List of quizes</h1>
        {this.props.loading && this.props.quizes.length !== 0 ? (
          <Loader />
        ) : (
          <ul>{this.rendreQuizes()}</ul>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);

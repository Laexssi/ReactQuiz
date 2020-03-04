import React, { Component } from "react";
import { connect } from "react-redux";

import Loader from "../../components/UI/Loader/Loader";
import classes from "./QuizList.module.css";
import QuizItem from "../../components/QuizItem/QuizItem";
import { fetchQuizes } from "./../../store/actions/quiz";

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map((quiz, index) => {
      return (
        <li key={quiz.id}>
          <QuizItem
            name={quiz.name}
            number={index + 1}
            author={quiz.author || "Anonymous"}
            id={quiz.id}
          />
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
          <React.Fragment>
            <ul>{this.renderQuizes()}</ul>
            {!this.props.isAuthenticated && (
              <p>Authenticated users have the right to edit quizes</p>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
    isAuthenticated: !!state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);

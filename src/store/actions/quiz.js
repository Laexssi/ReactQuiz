import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCES,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCES,
  QUIZ_SET_ANSWER,
  QUIZ_FINISH,
  QUIZ_NEXT,
  QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get("/quizes/.json");
      console.log(response.data);
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        console.log(key);
        quizes.push({
          id: key,
          name: `${response.data[key].quizName}`
        });
      });
      console.log(quizes);
      dispatch(fetchQuizesSucces(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/quizes/${quizId}/quiz.json`);
      console.log(response.data);
      const quiz = response.data;

      dispatch(fetchQuizSucces(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizSucces(quiz) {
  return {
    type: FETCH_QUIZ_SUCCES,
    quiz
  };
}
//create  action to set loading: true
export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  };
}
//create action to set loading: false, quizes:action.quizes
export function fetchQuizesSucces(quizes) {
  return {
    type: FETCH_QUIZES_SUCCES,
    quizes
  };
}
//create action to set loading: true, error:action.error
export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  };
}

export function quizSetAnswer(answerStatus, results) {
  return {
    type: QUIZ_SET_ANSWER,
    answerStatus,
    answerResults: results
  };
}

export function quizNext(number) {
  return {
    type: QUIZ_NEXT,
    number
  };
}

export function quizFinish() {
  return {
    type: QUIZ_FINISH
  };
}

export function quizRetry() {
  return {
    type: QUIZ_RETRY
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    console.log(state);

    if (state.answerStatus) {
      const key = Object.keys(state.answerStatus)[0];
      if (state.answerStatus[key] === "correct") return;
    }
    console.log(state.activeQuestion);
    const correctAnswer = state.quiz[state.activeQuestion].correctAnswerId;
    console.log(correctAnswer);
    const results = state.answerResults;
    const question = state.quiz[state.activeQuestion];

    if (answerId === correctAnswer) {
      if (!results[question.id]) {
        results[question.id] = "correct";
      }

      dispatch(quizSetAnswer({ [answerId]: "correct" }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          console.log("out of questions");
          dispatch(quizFinish());
        } else {
          console.log("next question");
          dispatch(quizNext(state.activeQuestion + 1));
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "incorrect";
      dispatch(quizSetAnswer({ [answerId]: "incorrect", results }));
      //   this.setState({
      //     answerStatus: { [answerId]: "incorrect" },
      //     answerResults: results
      //   });
      console.log("incorrect answer");
    }
  };
}
function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

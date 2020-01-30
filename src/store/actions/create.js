import {
  CREATE_QUIZ_QUESTION,
  ON_CHANGE_QUIZ_NAME,
  RESET_QUIZ_CREATION
} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  };
}

export function onChangeQuizName(e) {
  return {
    type: ON_CHANGE_QUIZ_NAME,
    e
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  };
}
export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post("/quizes.json", getState().create);
    dispatch(resetQuizCreation());
  };
}

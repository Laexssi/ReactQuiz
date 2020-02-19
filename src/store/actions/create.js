import {
  CREATE_QUIZ_QUESTION,
  SET_QUIZ_NAME,
  RESET_QUIZ_CREATION
} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  };
}

export function setQuizName(name) {
  return {
    type: SET_QUIZ_NAME,
    name
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

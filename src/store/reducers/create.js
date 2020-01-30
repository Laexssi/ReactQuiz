import {
  CREATE_QUIZ_QUESTION,
  ON_CHANGE_QUIZ_NAME,
  RESET_QUIZ_CREATION
} from "../actions/actionTypes";

const initialState = {
  quiz: [],
  quizName: ""
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      };
    case ON_CHANGE_QUIZ_NAME:
      return {
        ...state,
        quizName: action.e.target.value
      };
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: [],
        quizName: ""
      };
    default:
      return state;
  }
}

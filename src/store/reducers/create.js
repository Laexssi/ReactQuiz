import {
  CREATE_QUIZ_QUESTION,
  SET_QUIZ_NAME,
  RESET_QUIZ_CREATION
} from "../actions/actionTypes";

const initialState = {
  quiz: [],
  quizName: "",
  author: ""
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item],
        author: localStorage.getItem("email")
      };
    case SET_QUIZ_NAME:
      return {
        ...state,
        quizName: action.name
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

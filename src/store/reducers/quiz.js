import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCES,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCES,
  QUIZ_SET_ANSWER,
  QUIZ_FINISH,
  QUIZ_NEXT,
  QUIZ_RETRY,
  EDIT_QUIZ,
  ADD_QUESTION
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  isFinished: false,
  activeQuestion: 0,
  answerResults: {},
  answerStatus: null,
  quiz: null
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUIZES_SUCCES:
      return {
        ...state,
        loading: false,
        quizes: action.quizes
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FETCH_QUIZ_SUCCES:
      return {
        ...state,
        loading: false,
        quiz: action.quiz
      };
    case QUIZ_SET_ANSWER:
      return {
        ...state,
        answerStatus: action.answerStatus,
        results: action.answerResults
      };
    case QUIZ_NEXT:
      return {
        ...state,
        activeQuestion: action.number,
        answerStatus: null
      };
    case QUIZ_FINISH:
      return {
        ...state,
        isFinished: true
      };
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerStatus: null,
        isFinished: false,
        answerResults: {}
      };
    case EDIT_QUIZ: {
      return {
        ...state,
        quiz: action.item
      };
    }
    case ADD_QUESTION: {
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      };
    }

    default:
      return state;
  }
}

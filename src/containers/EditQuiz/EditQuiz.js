import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchQuizById,
  editQuiz,
  postQuiz,
  addQuestion
} from "../../store/actions/quiz";
import classes from "./EditQuiz.module.css";
import {
  createControl,
  validate,
  validateForm
} from "../../form/formFramework";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Loader from "../../components/UI/Loader/Loader";
import Select from "../../components/UI/Select/Select";
import QuestionList from "../../components/QuestionList/QuestionList";
function createOptionControl(number) {
  return createControl(
    {
      label: `Type answer  #${number}`,
      errorMessage: "Can not be empty",
      id: number
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Type a question",
        errorMessage: "Can not be empty"
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
}

class EditQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathId: this.props.match.params.id,
      isFormValid: false,
      currentQuiz: 0,
      correctAnswerId: 0,
      formControls: createFormControls()
    };
    this.switchQuestionHandler = this.switchQuestionHandler.bind(this);
    this.editQuestionHandler = this.editQuestionHandler.bind(this);
  }
  async componentDidMount() {
    console.log(this.props.location.name);

    if (this.props.location.name) {
      localStorage.setItem(
        `quizName${this.props.match.id}`,
        JSON.stringify(this.props.location.name)
      );
      this.quizName = this.props.location.name;
    } else {
      this.quizName = localStorage.getItem(
        `quizName${this.props.location.name}`
      );
      if (this.quizName) this.quizName = JSON.parse(this.quizName);
    }
    await this.props.fetchQuizById(this.props.match.params.id);
    this.setState({
      formControls: createFormControls()
    });
    console.log(this.props.quiz);
  }
  submitHandler = e => {
    e.preventDefault();
  };
  onChangeHandler = (e, formName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[formName] };

    control.touched = true;
    control.value = e.target.value;
    control.valid = validate(control.value, control.validation);

    formControls[formName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };
  renderInputs() {
    return Object.keys(this.state.formControls).map((name, index) => {
      const formName = this.state.formControls[name];
      return (
        <React.Fragment key={index}>
          <p>
            {index === 0
              ? `Question: ${this.props.quiz[this.state.currentQuiz].question}`
              : `Option #${index}: ${
                  this.props.quiz[this.state.currentQuiz].answers[index - 1]
                    .text
                }`}
          </p>
          <Input
            key={`${formName.label}-${index}`}
            placeholder={
              index === 0
                ? this.props.quiz[this.state.currentQuiz].question
                : this.props.quiz[this.state.currentQuiz].answers[index - 1]
                    .text
            }
            size={index === 0 ? 3 : 1}
            label={formName.label}
            value={this.state.value}
            valid={formName.valid}
            touched={formName.touched}
            shouldValidate={!!formName.validation}
            errorMessage={formName.errorMessage}
            onChange={e => this.onChangeHandler(e, name)}
          />
          {index === 0 ? <hr color="black" width="100%" /> : null}
        </React.Fragment>
      );
    });
  }

  switchQuestionHandler(e) {
    console.log(e.target.textContent);
    this.setState({ currentQuiz: +e.target.textContent - 1 });
  }
  selectChangeHandler = e => {
    console.log(e.target.value);
    this.setState({
      correctAnswerId: +e.target.value
    });
  };

  addQuestionHandler = e => {
    e.preventDefault();
    const questionItem = {
      question: "Empty question, please fill it via edit quiz",
      id: this.props.quiz.length + 1,
      correctAnswerId: this.state.correctAnswerId,
      answers: [
        {
          text: "Empty option, please fill it via edit quiz",
          id: 1
        },
        {
          text: "Empty option, please fill it via edit quiz",
          id: 2
        },
        {
          text: "Empty option, please fill it via edit quiz",
          id: 3
        },
        {
          text: "Empty option, please fill it via edit quiz",
          id: 4
        }
      ]
    };

    this.props.addQuestion(questionItem);
  };
  editQuestionHandler = e => {
    e.preventDefault();

    const {
      question,
      option1,
      option2,
      option3,
      option4
    } = this.state.formControls;

    const questionItem = {
      question:
        question.value || this.props.quiz[this.state.currentQuiz].question,
      id: this.state.currentQuiz + 1,
      correctAnswerId:
        this.state.correctAnswerId ||
        this.props.quiz[this.state.currentQuiz].correctAnswerId,
      answers: [
        {
          text:
            option1.value ||
            this.props.quiz[this.state.currentQuiz].answers[option1.id - 1]
              .text,
          id: option1.id
        },
        {
          text:
            option2.value ||
            this.props.quiz[this.state.currentQuiz].answers[option2.id - 1]
              .text,
          id: option2.id
        },
        {
          text:
            option3.value ||
            this.props.quiz[this.state.currentQuiz].answers[option3.id - 1]
              .text,
          id: option3.id
        },
        {
          text:
            option4.value ||
            this.props.quiz[this.state.currentQuiz].answers[option4.id - 1]
              .text,
          id: option4.id
        }
      ]
    };

    const quizes = this.props.quiz;
    const index = quizes.findIndex(({ id }) => id === questionItem.id);
    quizes[index] = questionItem;

    console.log(quizes);

    this.props.editQuiz(quizes);
    this.props.postQuiz(this.state.pathId);
    this.setState({
      isFormValid: false,
      correctAnswerId: 1,
      formControls: createFormControls()
    });
  };

  render() {
    return (
      <div className={classes.EditQuiz}>
        <div>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : (
            <form onClick={this.submitHandler}>
              <React.Fragment>
                <h3>Quiz {this.quizName}</h3>
                <p>Choose question number</p>
                <QuestionList
                  quiz={this.props.quiz}
                  onClick={this.switchQuestionHandler}
                  currentQuiz={this.state.currentQuiz}
                />
                <div>
                  <Button type="secondary" onClick={this.addQuestionHandler}>
                    add new question
                  </Button>
                </div>

                {this.renderInputs()}
                <p>
                  Current correct answer #
                  {this.props.quiz[this.state.currentQuiz].correctAnswerId}
                </p>
                <Select
                  label="Edit right answer"
                  value={
                    this.state.correctAnswerId ||
                    this.props.quiz[this.state.currentQuiz].correctAnswerId
                  }
                  onChange={this.selectChangeHandler}
                  options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 }
                  ]}
                />
                <div>
                  <Button type="primary" onClick={this.editQuestionHandler}>
                    Edit Question
                  </Button>
                </div>
              </React.Fragment>
            </form>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
    editQuiz: quiz => dispatch(editQuiz(quiz)),
    postQuiz: id => dispatch(postQuiz(id)),
    addQuestion: question => dispatch(addQuestion(question))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditQuiz);

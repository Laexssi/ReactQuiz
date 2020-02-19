import React, { Component } from "react";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  createControl,
  validate,
  validateForm
} from "../../form/formFramework";

import { connect } from "react-redux";
import {
  createQuizQuestion,
  finishCreateQuiz,
  setQuizName
} from "../../store/actions/create";

function createOptionControl(number) {
  return createControl(
    {
      label: `Type answer  #${number}`,
      errorMessage: "Can not be empty",
      id: number,
      value: ""
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Type a question",
        errorMessage: "Can not be empty",
        value: ""
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
}

class QuizCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      correctAnswerId: 1,
      formControls: createFormControls()
    };
    this.renderInputs = this.renderInputs.bind(this);
    this.selectChangeHandler = this.selectChangeHandler.bind(this);
    this.addQuestionHandler = this.addQuestionHandler.bind(this);
  }
  submitHandler = e => {
    e.preventDefault();
  };
  onChangeHandler = (e, formName) => {
    console.log(formName);
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

  onChangeNameHandler = e => {
    let { value } = e.target;
    this.setState(prev => ({
      ...prev,
      quizName: value
    }));
  };

  addQuestionHandler = e => {
    e.preventDefault();

    const {
      question,
      option1,
      option2,
      option3,
      option4
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      correctAnswerId: this.state.correctAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id
        },
        {
          text: option2.value,
          id: option2.id
        },
        {
          text: option3.value,
          id: option3.id
        },
        {
          text: option4.value,
          id: option4.id
        }
      ]
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      correctAnswerId: 1,
      formControls: createFormControls()
    });
  };

  createQuizHandler = e => {
    e.preventDefault();
    this.props.setQuizName(this.state.quizName);
    this.setState({
      isFormValid: false,
      correctAnswerId: 1,
      formControls: createFormControls()
    });

    this.props.finishCreateQuiz();
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((name, index) => {
      const formName = this.state.formControls[name];
      return (
        <React.Fragment key={index}>
          <Input
            key={`${formName.label}-${index}`}
            size={index === 0 ? 3 : 1}
            label={formName.label}
            valid={formName.valid}
            value={formName.value}
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

  selectChangeHandler = e => {
    this.setState({
      correctAnswerId: +e.target.value
    });
  };
  render() {
    const select = (
      <Select
        label="Choose right answer"
        value={this.state.correctAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 }
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <form onSubmit={this.submitHandler}>
            <h1>Create a quiz</h1>
            {this.renderInputs()}
            {select}
            <div>
              <Button
                type="primary"
                onClick={this.addQuestionHandler}
                disabled={!this.state.isFormValid}
              >
                Add question
              </Button>
              <Input
                key={`quizName`}
                label={"Quiz name"}
                shouldValidate={false}
                onChange={e => this.onChangeNameHandler(e)}
              />
              <Button
                type="primary"
                onClick={this.createQuizHandler}
                disabled={this.props.quiz.length === 0}
              >
                Create a quiz
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
    quizName: state.create.quizName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    setQuizName: value => dispatch(setQuizName(value)),
    finishCreateQuiz: name => dispatch(finishCreateQuiz(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);

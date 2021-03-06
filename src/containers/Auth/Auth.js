import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: true,
      formControls: {
        email: {
          type: "email",
          label: "E-mail",
          vlaue: "",
          errorMessage: "e.g. 'example@test.com'",
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          type: "password",
          label: "Password",
          vlaue: "",
          errorMessage: "Password's length should be 6 or more characters",
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6
          }
        }
      }
    };
  }
  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  signupHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  submitHandler = e => {
    e.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) return true;
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (e, controlName) => {
    console.log(`${controlName}:`, e.target.value);

    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      isFormValid,
      formControls
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      );
    });
  }
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            <h1>Authorization</h1>

            {this.renderInputs()}

            <div className={classes.wrapper}>
              <Button
                type="correct"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Login
              </Button>

              <Button
                type="primary"
                onClick={this.signupHandler}
                disabled={!this.state.isFormValid}
              >
                Sign up
              </Button>
            </div>
            {this.props.isFailed && (
              <p className={classes.fail}>Incorrect e-mail or password</p>
            )}
            <p>Authenticated users can create and edit quizzes</p>
          </form>
        </div>
      </div>
    );
  }
}

function validateEmail(email) {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function mapStateToProps(state) {
  return {
    isFailed: state.auth.isFailed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

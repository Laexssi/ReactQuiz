import React, { Component } from "react";
import Layout from "./hoc/layout/Layout.js";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import "./App.css";
import Quiz from "./containers/Quiz/Quiz.js";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout.js";
import { autoLogin } from "./store/actions/auth.js";
import EditQuiz from "./containers/EditQuiz/EditQuiz";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />

        <Route path="/quiz/:id/" component={Quiz} />

        <Route path="/list" exact component={QuizList} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" exact component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/list/:id" component={EditQuiz} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/list" exact component={QuizList} />
          <Redirect to="/list" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}
function mapStateToProps(state) {
  return {
    token: state.auth.token,
    isAuthenticated: !!state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

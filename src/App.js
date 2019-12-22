import React, {Component} from 'react';
import Layout from './hoc/layout/Layout.js'
import './App.css';
import Quiz from './containers/quiz/Quiz.js'


class App extends Component {
render() {
  return (
    <Layout>
    <Quiz />
    </Layout>
  )
}
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import 'fontsource-roboto';
import App from './App';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/reset" component={ResetPassword} />

      <Route exact path="/home" component={App}/>
      <Route render={() => <Redirect to={{ pathname: "/login" }}/>} />
    </Switch>
  </Router>,

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

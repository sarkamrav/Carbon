import React,{lazy,Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Link,Switch, withRouter,Redirect} from 'react-router-dom';
import Carbon from './component/Carbon'

const App =() =>{
  return (
    <Router>
      <Switch>
      <Route path ='/' component ={Carbon} exact/> 
     </Switch>
  </Router>
  );
  }

export default withRouter(App);

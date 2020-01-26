import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Homepage } from './components';

const App = () => (
  <Router>
    {/* <Route exact path='/' component={LoginRegister} /> */}
    <Route exact path='/' component={Homepage} />
  </Router>
);

export default App;

import React from 'react';
import WorkArea from './components/WorkArea'
import { Route } from 'react-router-dom'
import 'normalize.css'
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Route path="/">
        <WorkArea />
      </Route>
    </div>
  );
}

export default App;

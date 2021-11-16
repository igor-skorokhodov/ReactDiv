import React from 'react';
import NewDiv from '../src/components/NewDiv';
import './App.css';

function App() {
  return (
    <div className="App">
      <NewDiv beginX={0} beginY={0} endX={0} endY={0}/>
    </div>
  );
}

export default App;

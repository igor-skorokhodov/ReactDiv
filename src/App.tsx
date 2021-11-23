import React from "react";
import NewDiv from "../src/components/NewDiv";
import "./App.css";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <NewDiv
      array={[{beginX: 0, beginY: 0, endX: 0, endY: 0, width: 0, height: 0}]} isClicked={false}/>
    </div>
    </DndProvider>
  );
}

export default App;

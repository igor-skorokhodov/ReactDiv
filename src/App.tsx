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
        beginX={0}
        beginY={0}
        endX={0}
        endY={0}
        isClicked={false}
        width={0}
        height={0}
      />
    </div>
    </DndProvider>
  );
}

export default App;

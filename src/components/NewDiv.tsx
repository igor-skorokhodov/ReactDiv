import React from "react";
import "../components/NewDiv.css";

interface MyState {
  beginX: 0;
  beginY: 0;
  endX: 0;
  endY: 0;
}

interface MyProps {
  beginX: number;
  beginY: number;
  endX: number;
  endY: number;
}

class NewDiv extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { beginX: 0, beginY: 0, endX: 0, endY: 0 };
  }

  mouseDown(e: any) {
    this.setState({ beginX: e.pageX });
    this.setState({ beginY: e.pageY });
    var x = document.createElement("div");
    x.classList.add("div-new");
    document.body.appendChild(x);
  }

  mouseUp() {
    let x: any = document.querySelector(".div-new");
    let width = this.state.endX - this.state.beginX;
    let height = this.state.endY - this.state.beginY;
    x.style.top = this.state.beginY + "px";
    x.style.left = this.state.beginX + "px";
    x.style.position = "absolute";
    x.style.width = width + "px";
    x.style.height = height + "px";
    x.style.border = "1px solid black";
  }

  mouseMove(e: any) {
    this.setState({ endX: e.pageX });
    this.setState({ endY: e.pageY });
  }
  render() {
    return (
      <div className="NewDiv">
        <header className="App-header">
          <p>Div для рисования divов</p>
        </header>
        <div
          className="div-selected"
          onMouseDown={this.mouseDown.bind(this)}
          onMouseUp={this.mouseUp.bind(this)}
          onMouseMove={this.mouseMove.bind(this)}
        ></div>
      </div>
    );
  }
}

export default NewDiv;

import React from "react";
import "../components/NewDiv.css";

interface MyState {
  beginX: number;
  beginY: number;
  endX: number;
  endY: number;
  isClicked: boolean;
  width: number;
  height: number;
}

interface MyProps {
  beginX: number;
  beginY: number;
  endX: number;
  endY: number;
  isClicked: boolean;
  width: number;
  height: number;
}

class NewDiv extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
  }

  mouseDown(e: any) {
    this.setState({ beginX: e.pageX });
    this.setState({ beginY: e.pageY });
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  handleMouseMove(e: any) {
    this.setState({ endX: e.pageX });
    this.setState({ endY: e.pageY });
    this.setState({ width: this.state.endX - this.state.beginX });
    this.setState({ height: this.state.endY - this.state.beginY });
  }

  mouseUp() {
    document.removeEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  isClicked() {
    this.setState({ isClicked: !this.isClicked });
  }

  render() {
    return (
      <div className="NewDiv">
        <header className="App-header">
          <p>Div для рисования divов</p>
        </header>
        {this.state.isClicked ? (
          <div
            className="div-selected"
            style={{
              top: this.state.beginY,
              left: this.state.beginX,
              width: this.state.width,
              height: this.state.height,
              position: "absolute",
              border: "1px solid black",
            }}
            onMouseDown={this.mouseDown.bind(this)}
            onMouseUp={this.mouseUp.bind(this)}
          ></div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default NewDiv;

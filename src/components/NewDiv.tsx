import React from "react";
import "../components/NewDiv.css";

interface MyProps {
  beginX: number;
  beginY: number;
  endX: number;
  endY: number;
  isClicked: boolean;
  width: number;
  height: number;
}

interface MyState {
  beginX?: number;
  beginY?: number;
  endX?: number;
  endY?: number;
  isClicked?: boolean;
  width?: number;
  height?: number;
}

class NewDiv extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { isClicked: false };
  }

  mouseDown(e: any) {
    this.setState({
      beginX: e.pageX,
      beginY: e.pageY,
      width: 0,
      height: 0,
      isClicked: !this.state.isClicked,
    });
    this.setIsClicked.bind(this);
  }

  handleMouseMove(e: any) {
    this.setState({
      endX: e.pageX,
      endY: e.pageY,
      width: e.pageX - (this.state as any).beginX,
      height: e.pageY - (this.state as any).beginY,
    });
  }

  mouseUp(e: any) {
    window.onmousemove = null;
  }

  setIsClicked() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    return (
      <div className="NewDiv">
        <header className="App-header">
          <p>Div для рисования divов</p>
        </header>
        <div
          className="field"
          onMouseDown={this.mouseDown.bind(this)}
          onMouseUp={this.mouseUp.bind(this)}
          onMouseMove={this.handleMouseMove.bind(this)}
        >
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
            ></div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default NewDiv;

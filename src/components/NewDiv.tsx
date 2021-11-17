import React from "react";
import "../components/NewDiv.css";

interface MyState {
  beginX?: number;
  beginY?: number;
  endX?: number;
  endY?: number;
  isClicked?: boolean;
  width?: number;
  height?: number;
}

class NewDiv extends React.Component<MyState> {
  constructor(props: any) {
    super(props);
    this.state = { isClicked: false};
  }

  mouseDown(e: any) {
    this.setState({
      beginX: e.pageX,
      beginY: e.pageY,
      width: 0,
      height: 0,
      isClicked: !(this.state as any).isClicked
    });
  }

  handleMouseMove(e: any) {
    this.setState({
      endX: e.pageX,
      endY: e.pageY,
      width: e.pageX - (this.state as any).beginX,
      height: e.pageY - (this.state as any).beginY,
    });
    console.log("444")
  }

  mouseUp(e: any) {
    this.setIsClicked();
    console.log((this.state as any).isClicked);
  }

  setIsClicked() {
    this.setState({ isClicked: !(this.state as any).isClicked });
  }

  setIsClickedFalse() {
    this.setState({ isClicked: false });
    console.log((this.state as any).isClicked);
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
          onMouseOut={this.setIsClickedFalse.bind(this)}
          onMouseMove={(this.state as any).isClicked ? (e: any) => {
            console.log("3333")
            this.handleMouseMove(e);
          } : undefined}
        >
          {(this.state as any).isClicked ? (
            <div
              className="div-selected"
              style={{
                top: (this.state as any).beginY,
                left: (this.state as any).beginX,
                width: (this.state as any).width,
                height: (this.state as any).height,
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

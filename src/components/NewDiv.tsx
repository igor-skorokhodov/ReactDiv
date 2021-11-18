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
    this.state = { isClicked: false };
  }

  mouseDown(e: any) {
    this.setState({
      beginX: e.pageX,
      beginY: e.pageY,
      width: 0,
      height: 0,
      isClicked: true,
    });
  }

  handleMouseMove(e: any) {
    if (
      e.pageX - (this.state as any).beginX < 0 ||
      e.pageY - (this.state as any).beginY < 0
    ) {
      this.setState({
        endX: e.pageX,
        endY: e.pageY,
        width: Math.abs(e.pageX - (this.state as any).beginX),
        height: Math.abs(e.pageY - (this.state as any).beginY),
      });
    } else {
      this.setState({
        endX: e.pageX,
        endY: e.pageY,
        width: e.pageX - (this.state as any).beginX,
        height: e.pageY - (this.state as any).beginY,
      });
    }
  }

  mouseUp(e: any) {
    this.setIsClickedFalse();
  }

  setIsClicked() {
    this.setState({ isClicked: true });
  }

  setIsClickedFalse() {
    this.setState({ isClicked: false });
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
          // onMouseOut={this.setIsClickedFalse.bind(this)}
          onMouseMove={
            (this.state as any).isClicked
              ? (e: any) => {
                  this.handleMouseMove(e);
                }
              : undefined
          }
        >
          {(this.state as any).isClicked ? (
            <div
              className="div-selected"
              style={{
                top:
                  (this.state as any).endY > (this.state as any).beginY
                    ? (this.state as any).beginY
                    : (this.state as any).endY,
                left:
                  (this.state as any).endX > (this.state as any).beginX
                    ? (this.state as any).beginX
                    : (this.state as any).endX,
                width: (this.state as any).width,
                height: (this.state as any).height,
              }}
            ></div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default NewDiv;

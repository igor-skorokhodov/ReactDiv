import React from "react";
import { isConstructorDeclaration } from "typescript";
import "../components/NewDiv.css";
import { useDrag } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Knight from "./Knight";

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
    this.state = {
      isClicked: false,
      isSet: false,
      isMouseDown: false,
      array: [1, 2, 3],
      ItemTypes: {
        KNIGHT: "knight",
      },
    };
  }

  mouseDown(e: any) {
    this.setState({
      beginX: e.pageX,
      beginY: e.pageY,
      width: 0,
      height: 0,
      isClicked: true,
      isSet: true,
      isMouseDown: true,
    });
  }

  handleMouseMove(e: any) {
    console.log("1111");
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

  handleMouseMoveDiv(e: any) {
    this.setState({
      endX: e.pageX, //(this.state as any).beginX,
      endY: e.pageY, //(this.state as any).beginY,
      width: e.pageX - (this.state as any).beginX,
      height: e.pageY - (this.state as any).beginY,
    });
  }

  mouseUp(e: any) {
    this.setIsClickedFalse();
    this.setState({ isMouseDown: false });
    if (
      e.pageX - (this.state as any).beginX < 0 ||
      e.pageY - (this.state as any).beginY < 0
    ) {
      this.setState({
        endX: e.pageX,
        endY: e.pageY,
        width: Math.abs(e.pageX - (this.state as any).beginX),
        height: Math.abs(e.pageY - (this.state as any).beginY),
        isMouseDown: false,
      });
    } else {
      this.setState({
        endX: e.pageX,
        endY: e.pageY,
        width: e.pageX - (this.state as any).beginX,
        height: e.pageY - (this.state as any).beginY,
        isMouseDown: false,
      });
    }
  }

  setIsClicked() {
    this.setState({ isClicked: true });
  }

  setIsClickedFalse() {
    this.setState({ isClicked: false });
  }

  render() {
    return (
      <>
        <Knight />
        <div className="NewDiv">
          <header className="App-header">
            <p>Div для рисования divов</p>
          </header>
          <div
            className="field"
            onMouseDown={this.mouseDown.bind(this)}
            onMouseUp={this.mouseUp.bind(this)}
            onMouseMove={
              (this.state as any).isClicked
                ? (e: any) => {
                    this.handleMouseMove(e);
                  }
                : undefined
            }
          >
              
            {(this.state as any).isSet
              ? (this.state as any).array.map((item: any) => {
                  return (
                    <div
                      className="div-selected"
                      onMouseDown={(e: any) => {
                        this.handleMouseMoveDiv(e);
                      }}
                      onMouseUp={this.mouseUp.bind(this)}
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
                  );
                })
              : null}
          </div>
        </div>
      </>
    );
  }
}

export default NewDiv;

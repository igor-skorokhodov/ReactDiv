import React from "react";
import { isConstructorDeclaration } from "typescript";
import "../components/NewDiv.css";
import Knight from "./Knight";

interface IDiv {
  beginX?: number;
  beginY?: number;
  endX?: number;
  endY?: number;
  width?: number;
  height?: number;
}

interface IMyState {
  array?: IDiv[];
  isClicked?: boolean;
}

class NewDiv extends React.Component<IMyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isClicked: false,
      isSet: false,
      isMouseDown: false,
      array: [{ beginX: 0, beginY: 0, endX: 0, endY: 0, width: 0, height: 0 }],
      ItemTypes: {
        KNIGHT: "knight",
      }
    };
  }

  mouseDown(e: any) {
    this.setState({
      isClicked: true,
      isSet: true,
      isMouseDown: true,
      array: [ ... (this.state as any).array, 
      {
        beginX: e.pageX,
        beginY: e.pageY,
        width: 0,
        height: 0,
      }],
    });
    console.log((this.state as any).array);
  }

  handleMouseMove(e: any) {
    if (
      e.pageX - (this.state as any).array.beginX < 0 ||
      e.pageY - (this.state as any).array.beginY < 0
    ) {
      this.setState({
        array: {
          endX: e.pageX,
          endY: e.pageY,
          width: Math.abs(e.pageX - (this.state as any).array.beginX),
          height: Math.abs(e.pageY - (this.state as any).array.beginY),
        },
      });
    } else {
      this.setState({
        array: {
          endX: e.pageX,
          endY: e.pageY,
          width: e.pageX - (this.state as any).array.beginX,
          height: e.pageY - (this.state as any).array.beginY,
        },
      });
    }
  }

  handleMouseMoveDiv(e: any) {
    this.setState({
      endX: e.pageX, //(this.state as any).beginX,
      endY: e.pageY, //(this.state as any).beginY,
      width: e.pageX - (this.state as any).array.beginX,
      height: e.pageY - (this.state as any).array.beginY,
    });
  }

  mouseUp(e: any) {
    this.setIsClickedFalse();
    this.setState({ isMouseDown: false });
    if (
      e.pageX - (this.state as any).array.beginX <
        0 ||
      e.pageY - (this.state as any).array.beginY < 0
    ) {
      this.setState({
        array: {
          endX: e.pageX,
          endY: e.pageY,
          width: Math.abs(e.pageX - (this.state as any).array.beginX),
          height: Math.abs(e.pageY - (this.state as any).array.beginY),
        },
        isMouseDown: false,
      });
    } else {
      this.setState({
        array: {
          endX: e.pageX,
          endY: e.pageY,
          width: e.pageX - (this.state as any).array.beginX,
          height: e.pageY - (this.state as any).array.beginY,
          isMouseDown: false,
        },
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
    {console.log((this.state as any).array)}
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
            {console.log((this.state as any).array)}
            {(this.state as any).isSet
              ? (this.state as any).array.map((item: any) => {
                  console.log(item);
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

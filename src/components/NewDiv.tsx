import React from "react";
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
  array: IDiv[];
  current?: IDiv;
  isClicked?: boolean;
  isSet?: boolean;
  isMouseDown?: boolean;
}

class NewDiv extends React.Component<{}, IMyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isClicked: false,
      isSet: false,
      isMouseDown: false,
      array: [{ beginX: 0, beginY: 0, endX: 0, endY: 0, width: 0, height: 0 }],
      current: { beginX: 0, beginY: 0, endX: 0, endY: 0, width: 0, height: 0 },
    };
  }

  mouseDown(e: any) {
    if (e.target.classList.contains("div-selected")) {
      return;
    }
    this.setState({
      isClicked: true,
      isSet: true,
      isMouseDown: true,
      current: {
        beginX: e.pageX,
        beginY: e.pageY,
        width: 0,
        height: 0,
      },
    });
  }

  handleMouseMove(e: any) {
    if (
      e.pageX - (this.state.current?.beginX as number) < 0 ||
      e.pageY - (this.state.current?.beginY as number) < 0
    ) {
      this.setState({
        current: {
          beginX: this.state.current?.beginX,
          beginY: this.state.current?.beginY,
          endX: e.pageX,
          endY: e.pageY,
          width: Math.abs(e.pageX - (this.state.current?.beginX as number)),
          height: Math.abs(e.pageY - (this.state.current?.beginY as number)),
        },
      });
    } else {
      this.setState({
        current: {
          beginX: this.state.current?.beginX,
          beginY: this.state.current?.beginY,
          endX: e.pageX,
          endY: e.pageY,
          width: e.pageX - (this.state.current?.beginX as number),
          height: e.pageY - (this.state.current?.beginY as number),
        },
      });
    }
  }

  handleMouseMoveDiv(e: any) {
    this.setState({
      current: {
        beginX: this.state.current?.beginX,
        beginY: this.state.current?.beginY,
        endX: e.pageX, //(this.state as any).beginX,
        endY: e.pageY, //(this.state as any).beginY,
        width: e.pageX - (this.state.current?.beginX as number),
        height: e.pageY - (this.state.current?.beginY as number),
      },
    });
  }

  mouseUp(e: any) {
    this.setIsClickedFalse();
    this.setState({ isMouseDown: false });
    if (
      e.pageX - (this.state.current?.beginX as number) < 0 ||
      e.pageY - (this.state.current?.beginY as number) < 0
    ) {
      this.setState({
        array: [
          ...this.state.array,
          {
            beginX: (this.state as any).current.beginX,
            beginY: (this.state as any).current.beginY,
            endX: e.pageX,
            endY: e.pageY,
            width: Math.abs(e.pageX - (this.state as any).current.beginX),
            height: Math.abs(e.pageY - (this.state as any).current.beginY),
          },
        ],
        isMouseDown: false,
      });
    } else {
      this.setState({
        array: [
          ...this.state.array,
          {
            beginX: (this.state as any).current.beginX,
            beginY: (this.state as any).current.beginY,
            endX: e.pageX,
            endY: e.pageY,
            width: e.pageX - (this.state as any).current.beginX,
            height: e.pageY - (this.state as any).current.beginY,
          },
        ],
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
                          item.endY > item.beginY
                            ? item.beginY
                            : item.endY,
                        left:
                          item.endX > item.beginX
                            ? item.beginX
                            : item.endX,
                        width: item.width,
                        height: item.height,
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

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

interface IFieldProps {}

interface IFieldState {
  array: IDiv[];
  current?: IDiv;
  isClicked?: boolean;
  isSet?: boolean;
  isMouseDown?: boolean;
}

export default class Field extends React.Component<IFieldProps, IFieldState> {
  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      isClicked: false,
      isSet: false,
      isMouseDown: false,
      array: [],
    };
  }

  mouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLDivElement).classList.contains("div-selected")) {
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
      e.pageX - (this.state.current!.beginX as number) < 0 ||
      e.pageY - (this.state.current!.beginY as number) < 0
    ) {
      this.setState({
        current: {
          beginX: this.state.current!.beginX,
          beginY: this.state.current!.beginY,
          endX: e.pageX,
          endY: e.pageY,
          width: Math.abs(e.pageX - (this.state.current!.beginX as number)),
          height: Math.abs(e.pageY - (this.state.current!.beginY as number)),
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
        endX: e.pageX, //this.state.beginX,
        endY: e.pageY, //this.state.beginY,
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
            beginX: (this.state.current as IDiv).beginX,
            beginY: (this.state.current as IDiv).beginY,
            endX: e.pageX,
            endY: e.pageY,
            width: Math.abs(e.pageX - this.state.current!.beginX!),
            height: Math.abs(e.pageY - this.state.current!.beginY!),
          },
        ],
        isMouseDown: false,
      });
    } else {
      this.setState({
        array: [
          ...this.state.array,
          {
            beginX: this.state.current!.beginX,
            beginY: this.state.current!.beginY,
            endX: e.pageX,
            endY: e.pageY,
            width: e.pageX - this.state.current!.beginX!,
            height: e.pageY - this.state.current!.beginY!,
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
              this.state.isClicked
                ? (e: React.MouseEvent) => {
                    this.handleMouseMove(e);
                  }
                : undefined
            }
          >
            {this.state.array.map((item) => {
              return (
                <div
                  className="div-selected"
                 
                  //onMouseMove={this.handleMouseMove.bind(this)}
                  style={{
                    top:
                      (this.state.current!.endY || 0) > (this.state.current!.beginY || 0)
                        ? this.state.current!.beginY
                        : this.state.current!.endY,
                    left:
                      (this.state.current!.endX || 0) > (this.state.current!.beginX || 0)
                        ? this.state.current!.beginX
                        : this.state.current!.endX,
                    width: this.state.current!.width,
                    height: this.state.current!.height,
                  }}
                ></div>
              );
            })}
            {this.state.array.map((item) => {
              return (
                <div
                  className="div-selected"
                  onMouseDown={(e: any) => {
                    this.handleMouseMoveDiv(e);
                  }}
                  onMouseUp={this.mouseUp.bind(this)}
                  style={{
                    top:
                      (item.endY || 0) > (item.beginY || 0)
                        ? item.beginY
                        : item.endY,
                    left:
                      (item.endX || 0) > (item.beginX || 0)
                        ? item.beginX
                        : item.endX,
                    width: item.width,
                    height: item.height,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

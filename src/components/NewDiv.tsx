import React from "react";
import { BlockLike, isThisTypeNode } from "typescript";
import "../components/NewDiv.css";
import Knight from "./Knight";

interface IDiv {
  beginX?: number;
  beginY?: number;
  endX?: number;
  endY?: number;
  width?: number;
  height?: number;
  moveFlag?: boolean;
}

interface IFieldProps {}

interface IFieldState {
  array: IDiv[];
  current?: IDiv;
  isClicked?: boolean;
  isSet?: boolean;
  isMouseDown?: boolean;
}

let j = 0;
let k = 0;
let m = 0;

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
    k = 1;
    if (j === 0 && !(e.target as HTMLDivElement).classList.contains("div-selected")) {
      this.setState({
        isClicked: true,
        isSet: true,
        isMouseDown: true,
        current: {
          beginX: e.pageX,
          beginY: e.pageY,
          endX: 0,
          endY: 0,
          width: 0,
          height: 0,
        },
      });
      j = 1;
    }
    let tempArray = this.state.array;
    for (let i = 0; i < this.state.array.length; i++) {
      if (
        e.pageX <= this.state.array[i].beginX! + this.state.array[i].width! &&
        e.pageX >= this.state.array[i].beginX! - this.state.array[i].width! &&
        e.pageY >= this.state.array[i].beginY! - this.state.array[i].height! &&
        e.pageY <= this.state.array[i].beginY! + this.state.array[i].height!
      ) {
        tempArray[i] = {
          beginX: this.state.array[i].beginX,
          beginY: this.state.array[i].beginY,
          width: this.state.array[i].width,
          height: this.state.array[i].height,
          endX: this.state.array[i].beginX! + this.state.array[i].width!,
          endY: this.state.array[i].beginY! + this.state.array[i].height!,
          moveFlag: true,
        };
      } else {
        tempArray[i] = {
          beginX: this.state.array[i].beginX,
          beginY: this.state.array[i].beginY,
          width: this.state.array[i].width,
          height: this.state.array[i].height,
          endX: this.state.array[i].beginX! + this.state.array[i].width!,
          endY: this.state.array[i].beginY! + this.state.array[i].height!,
          moveFlag: false,
        };
      }
    }
    this.setState({ array: tempArray });
  }

  mouseUp(e: any) {
    let tempArray = this.state.array;
    console.log(this.state.array);
    for (let i = 0; i < this.state.array.length; i++) {
      if (this.state.array[i].moveFlag === true) {
        tempArray[i] = {
          beginX: this.state.array[i].beginX,
          beginY: this.state.array[i].beginY,
          width: this.state.array[i].width,
          height: this.state.array[i].height,
          endX: this.state.array[i].beginX! + this.state.array[i].width!,
          endY: this.state.array[i].beginY! + this.state.array[i].height!,
          moveFlag: false,
        };
      }
    }
    this.setState({ array: tempArray });
    if (j === 1) {
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
              moveFlag: false,
            },
          ],
          isMouseDown: false,
          current: {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0,
            width: 0,
            height: 0,
          }
        });
        j = 0;
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
              moveFlag: false,
            },
          ],
          isMouseDown: false,
          current: {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0,
            width: 0,
            height: 0,
          }
        });
        j = 0;
      }
      this.setIsClickedFalse();
      this.setState({ isMouseDown: false });
    }
    k = 0;
    m = 0;
  }

  setIsClicked() {
    this.setState({ isClicked: true });
  }

  setIsClickedFalse() {
    this.setState({ isClicked: false });
  }

  onDivMove(e: any) {
    m = 1;
    k = 0;
    let tempArray = this.state.array;
    console.log(this.state.array);

    for (let i = 0; i < this.state.array.length; i++) {
      console.log(this.state.array[i].moveFlag);
      if (this.state.array[i].moveFlag === true)
        tempArray[i] = {
          beginX: e.pageX - 50,
          beginY: e.pageY - 50,
          width: this.state.array[i].width,
          height: this.state.array[i].height,
          endX: e.pageX + this.state.array[i].width,
          endY: e.pageY + this.state.array[i].height,
          moveFlag: true,
        };
    }
    this.setState({ array: tempArray });
  }

  mouseMove(e: any) {
      if (k === 1) {
        this.setState({
          current: {
            beginX: this.state.current?.beginX,
            beginY: this.state.current?.beginY,
            endX: e.pageX,
            endY: e.pageY,
            width: Math.abs(e.pageX - this.state.current!.beginX!),
            height: Math.abs(e.pageY - this.state.current!.beginY!),
          },
        });
  }
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
            onMouseMove={this.mouseMove.bind(this)}
          >
            {this.state.array.map((item) => {
              return (
                <>
                  <div
                    className="div-selected"
                    onMouseMove={this.onDivMove.bind(this)}
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
                  <div
                    className="div-selected"
                    onMouseMove={this.onDivMove.bind(this)}
                    style={{
                      top:
                        (this.state.current!.endY || 0) >
                        (this.state.current!.beginY || 0)
                          ? this.state.current!.beginY
                          : this.state.current!.endY,
                      left:
                        (this.state.current!.endX || 0) >
                        (this.state.current!.beginX || 0)
                          ? this.state.current!.beginX
                          : this.state.current!.endX,
                      width: this.state.current!.width,
                      height: this.state.current!.height,
                    }}
                  ></div>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

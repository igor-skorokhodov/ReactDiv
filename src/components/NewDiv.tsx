import React from "react";
import "../components/NewDiv.css";

interface IDiv {
  beginX?: number;
  beginY?: number;
  endX?: number;
  endY?: number;
  width?: number;
  height?: number;
  moveFlag?: boolean;
  pos?: number;
}

interface IFieldProps {}

interface IFieldState {
  array: IDiv[];
  current?: IDiv;
  isClicked?: boolean;
  isSet?: boolean;
  isMouseDown?: boolean;
  rows: number;
  columns: number;
  cellArray: IDiv[];
  pos: number;
}

let pressedMouse = 0;
let isUnderY = 0;
let indexOfArray = 0;

export default class Field extends React.Component<IFieldProps, IFieldState> {
  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      isClicked: false,
      isSet: false,
      isMouseDown: false,
      array: [],
      rows: 0,
      columns: 0,
      cellArray: [],
      pos: -1,
      current: {
        beginX: 0,
        beginY: 0,
        endX: 0,
        endY: 0,
        width: 0,
        height: 0
      }
    };
  }

  handleChangeRows(e: any) {
    this.setState({ rows: e.target.value });
  }

  handleChangeColumns(e: any) {
    this.setState({ columns: e.target.value });
  }

  mouseDown(e: React.MouseEvent) {
    console.log(this.state.isClicked);
    this.setState({ isClicked: true });
    console.log(this.state.isClicked);
    if (!(e.target as HTMLDivElement).classList.contains("div-selected")) {
      console.log("da");
      this.setState({
        isClicked: true,
        isSet: true,
        isMouseDown: true,
        current: {
          beginX: e.pageX,
          beginY: e.pageY,
        },
      });
      pressedMouse = 1;
    } else {
      console.log("no");
      let tempArray = this.state.array;
      for (let i = 0; i < this.state.array.length; i++) {
        if (
          e.pageY >= this.state.array[i].endY! - 30 && // изменение границ дива при клике у границы
          e.pageY <= this.state.array[i].endY!
        ) {
          isUnderY = 1;
          indexOfArray = i;
          tempArray[i] = {
            beginX: this.state.array[i].beginX,
            beginY: this.state.array[i].beginY,
            width:
              this.state.array[i].width! +
              (e.pageX - this.state.array[i].endX!),
            height:
              this.state.array[i].height! +
              (e.pageY - this.state.array[i].endY!),
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
            moveFlag: true,
          };
        }
      }
      this.setState({ array: tempArray });
    }
  }

  mouseUp(e: any) {
    this.setState({ isClicked: false });
    let tempArray = this.state.array;
    for (let i = 0; i < this.state.array.length; i++) {
      console.log(this.state.array[i]);
      //отпустили мышь при перемещении закрыли флаг перемещения
      if (this.state.array[i].moveFlag === true) {
        tempArray[i] = {
          beginX: this.state.array[i].beginX,
          beginY: this.state.array[i].beginY,
          endX: this.state.array[i].endX,
          endY: this.state.array[i].endY,
          width: this.state.array[i].width,
          height: this.state.array[i].height,
          moveFlag: false,
          pos: i,
        };
      }
    }
    if (
      e.pageX - (this.state.current?.beginX as number) < 0 ||
      e.pageY - (this.state.current?.beginY as number) < 0
    ) {
      console.log("if")
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
        current: {
          beginX: e.pageX,
          beginY: e.pageY,
          endX: 0,
          endY: 0,
          width: 0,
          height: 0,
        },
        isMouseDown: false,
      });
    } else {
      console.log("ekse")
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
      });
    }
    console.log(this.state.array)
  }

  setIsClicked() {
    this.setState({ isClicked: true });
  }

  setIsClickedFalse() {
    this.setState({ isClicked: false });
  }

  onDivDown = (e: any, position: number) => {
    console.log('div Down')
    this.setState({
      pos: position,
    });
  };

  onDivMove(e: any) {
    let tempArray = this.state.array;
    //перемещение дива
    for (let i = 0; i < this.state.array.length; i++) {
      console.log('pos ' + this.state.pos)
      console.log('i ' + i)
      if (this.state.array[i].moveFlag === true && this.state.pos === i) {
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
    }
    this.setState({ array: tempArray });
  }

  mouseMove(e: any) {
    if (this.state.isClicked === true) {
      this.setState({
        current: {
          beginX: this.state.current?.beginX,
          beginY: this.state.current?.beginY,
          endX: e.pageX,
          endY: e.pageY,
          width: Math.abs(e.pageX - this.state.current?.beginX!),
          height: Math.abs(e.pageY - this.state.current?.beginY!),
        },
      });
    }
    for (let i = 0; i < this.state.array.length; i++) {
      //убрать current из поля видимости
      if (this.state.array[i].moveFlag === true) {
        this.setState({
          current: {
            beginX: e.pageX,
            beginY: e.pageY,
            endX: 0,
            endY: 0,
            width: 0,
            height: 0,
          },
        });
      }
    }
    let tempArray = this.state.array;
    if (
      pressedMouse === 1 &&
      (e.target as HTMLDivElement).classList.contains("cell")
    ) {
      for (
        let i = this.state.current?.beginX;
        i! <= this.state.current?.endX!;
        i!++
      ) {
        for (
          let j = this.state.current?.beginY;
          j! <= this.state.current?.endY!;
          j!++
        ) {
          let elem = document.elementFromPoint(i! + 10, j! + 10); //выделение ячеек
          if (
            elem?.classList.contains("field") ||
            elem?.classList.contains("div-selected")
          ) {
          } else {
            elem?.classList.add("underline");
          }
        }
      }
    }

    if (isUnderY === 1) {
      //изменение размера
      for (let i = 0; i < this.state.array.length; i++) {
        if (i === indexOfArray) {
          tempArray[i] = {
            beginX: this.state.array[i].beginX,
            beginY: this.state.array[i].beginY,
            width: e.pageX - this.state.array[i].beginX!,
            height: e.pageY - this.state.array[i].beginY!,
            endX: e.pageX,
            endY: e.pageY,
            moveFlag: false,
          };
        }
      }
    }
    this.setState({ array: tempArray });
  }

  render() {
    let rows = []; //создание ячеек
    for (let i = 0; i < 5; i++) {
      let rowID = `row ${i}`;
      let cell = [];
      let input = [];
      for (let idx = 0; idx < 5; idx++) {
        let cellID = `cell ${i}-${idx}`;
        cell.push(<td key={cellID} className={cellID} id={cellID}></td>);
        input.push(<input key={cellID} className={cellID} id={cellID} />);
      }
      rows.push(
        <tr key={i} id={rowID}>
          {input}
        </tr>
      );
    }
    return (
      <>
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
            <div className="container">
              <div className="row">
                <div className="col s12 board">
                  <table className="simple-board">
                    <tbody>{rows}</tbody>
                  </table>
                </div>
              </div>
            </div>
            {this.state.array.map((item, pos) => {
              return (
                <>
                  <div
                    className="div-selected"
                    onMouseDown={(e) => {this.onDivDown(e, pos)}}
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
                </>
              );
            })}
            <div
              className="div-selected"
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
          </div>
          <p className="text">Введите количество строк:</p>
          <input
            onChange={this.handleChangeRows.bind(this)}
            value={this.state.rows}
            className="input"
          />
          <p className="text">Введите количество столбцов:</p>
          <input
            onChange={this.handleChangeColumns.bind(this)}
            value={this.state.columns}
            className="input"
          />
        </div>
      </>
    );
  }
}

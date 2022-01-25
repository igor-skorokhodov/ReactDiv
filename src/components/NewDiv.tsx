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
  changeSize?: boolean;
}

interface IFieldProps {}

interface IFieldState {
  tempArrActive: IDiv[];
  arrayActive: IDiv[];
  array: IDiv[];
  current?: IDiv;
  isClicked?: boolean;
  isSet?: boolean;
  isMouseDown?: boolean;
  rows: number;
  columns: number;
  cellArray: IDiv[];
  pos: number;
  downActive: boolean;
  selectedDiv: boolean;
}

let pressedMouse = 0;

export default class Field extends React.Component<IFieldProps, IFieldState> {
  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      isClicked: false,
      isSet: false,
      isMouseDown: false,
      array: [],
      arrayActive: [],
      tempArrActive: [],
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
        height: 0,
      },
      downActive: false,
      selectedDiv: false,
    };
  }

  handleChangeRows(e: any) {
    this.setState({ rows: e.target.value });
  }

  handleChangeColumns(e: any) {
    this.setState({ columns: e.target.value });
  }

  mouseDown(e: React.MouseEvent) { //опускаем мышку на поле без дивов
    console.log(this.state.selectedDiv)
    this.setState({ isClicked: true });
    if (
      this.state.selectedDiv === false
    ) {
      console.log("srab")
      console.log(e.target as HTMLDivElement)
      this.setState({ //устанавливаем флаги и значение каррент по координатам
        isClicked: true,
        isSet: true,
        isMouseDown: true,
        current: {
          beginX: e.pageX,
          beginY: e.pageY,
        },
      });
    } 
  }

  mouseDownActive(e: React.MouseEvent, pos: any) {
    console.log("srabotalo")
    this.setState({ downActive: true, selectedDiv: true });
    let tempArray = this.state.arrayActive;
    let tempArray2 = this.state.array;
    for (let i = 0; i < this.state.array.length; i++) {
      if (
        this.state.array[i].beginX === this.state.arrayActive[0].beginX && //если кликаем по выделенному диву элемент в основном массиве скрывается
        this.state.array[i].beginY === this.state.arrayActive[0].beginY
      ) {
        tempArray2[i] = {
          beginX: 0,
          beginY: 0,
          width: 0,
          height: 0,
          endX: 0,
          endY: 0,
        };
      }
    }
    for (let i = 0; i < this.state.arrayActive.length; i++) {
      if (
        e.pageY >= this.state.arrayActive[i].endY! - 30 && // изменение границ дива при клике у границы
        e.pageY <= this.state.arrayActive[i].endY!
      ) {
        this.setState({ isClicked: false });
        tempArray[i] = {
          beginX: this.state.arrayActive[i].beginX,
          beginY: this.state.arrayActive[i].beginY,
          width:
            this.state.arrayActive[i].width! +
            (e.pageX - this.state.arrayActive[i].endX!),
          height:
            this.state.arrayActive[i].height! +
            (e.pageY - this.state.arrayActive[i].endY!),
          endX:
            this.state.arrayActive[i].beginX! +
            this.state.arrayActive[i].width!,
          endY:
            this.state.arrayActive[i].beginY! +
            this.state.arrayActive[i].height!,
          moveFlag: false,
          changeSize: true,
          pos: i,
        };
      } else {
        tempArray[i] = { //пробегаемся по всему массиву дивов
          beginX: this.state.arrayActive[i].beginX,
          beginY: this.state.arrayActive[i].beginY,
          width: this.state.arrayActive[i].width,
          height: this.state.arrayActive[i].height,
          endX: this.state.arrayActive[i].beginX! + this.state.array[i].width!,
          endY: this.state.arrayActive[i].beginY! + this.state.array[i].height!,
          moveFlag: true,
          pos: i,
        };
      }
      this.setState({ pos: pos });
    }
    this.setState({
      array: tempArray2,
      arrayActive: tempArray,
      current: {
        beginX: e.pageX,
        beginY: e.pageY,
        width: 0,
        height: 0,
        endX: 0,
        endY: 0,
      },
    });
  }

  mouseUp(e: any) {
    this.setState({ isClicked: false, tempArrActive: [] });
    let tempArray = this.state.array;
    for (let i = 0; i < this.state.array.length; i++) {
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
    let tempArray2 = this.state.arrayActive;
    for (let i = 0; i < this.state.arrayActive.length; i++) {
      //отпустили мышь при перемещении закрыли флаг перемещения или изменения размеров для выделенного дива
      if (
        this.state.arrayActive[i].moveFlag === true ||
        this.state.arrayActive[i].changeSize === true
      ) {
        tempArray2[i] = {
          beginX: this.state.arrayActive[i].beginX,
          beginY: this.state.arrayActive[i].beginY,
          endX: this.state.arrayActive[i].endX,
          endY: this.state.arrayActive[i].endY,
          width: this.state.arrayActive[i].width,
          height: this.state.arrayActive[i].height,
          moveFlag: false,
          changeSize: false,
          pos: i,
        };
      }
    }
    this.setState({ arrayActive: tempArray2 });

    if (
      !(e.target as HTMLDivElement).classList.contains("div-selected") &&
      !(e.target as HTMLDivElement).classList.contains("divActive")
    ) {
      for (let i = 0; i < this.state.array.length; i++) {
        tempArray[i] = {
          beginX: this.state.array[i].beginX,
          beginY: this.state.array[i].beginY,
          endX: this.state.array[i].endX,
          endY: this.state.array[i].endY,
          width: this.state.array[i].width,
          height: this.state.array[i].height,
          moveFlag: false,
          pos: i,
          changeSize: false,
        };
      }

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
        this.setState({
          downActive: false,
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
      }
    }
  }

  onDivDown = (e: any, position: number) => {
    let tempArray = [];
    for (let i = 0; i < this.state.array.length; i++) {
      if (position === i) {
        tempArray[0] = this.state.array[i];
      }
    }
    this.setState({
      pos: position,
      arrayActive: tempArray,
    });
  };

  onDivMove(e: any) {
    this.setState({
      current: {
        beginX: e.pageX,
        beginY: e.pageY,
      },
    });
    let tempArray = this.state.arrayActive;
    //перемещение дива
    for (let i = 0; i < this.state.arrayActive.length; i++) {
      if (this.state.arrayActive[i].moveFlag === true && this.state.pos === i) {
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
    this.setState({ arrayActive: tempArray });
  }

  onDivMoveActive(e: any) {
    this.setState({
      current: {
        beginX: e.pageX,
        beginY: e.pageY,
      },
    });
    let tempArray = this.state.arrayActive;
    let tempArray2 = this.state.array;
    //перемещение дива
    for (let i = 0; i < this.state.arrayActive.length; i++) {
      if (this.state.arrayActive[i].moveFlag === true && this.state.pos === i) {
        tempArray[i] = {
          beginX: e.pageX - 50,
          beginY: e.pageY - 50,
          width: this.state.arrayActive[i].width,
          height: this.state.arrayActive[i].height,
          endX: e.pageX + this.state.arrayActive[i].width,
          endY: e.pageY + this.state.arrayActive[i].height,
          moveFlag: true,
        };
      }
    }
    this.setState({ arrayActive: tempArray, array: tempArray2 });
  }

  mouseMove(e: any) {
    this.setState({
      current: {
        beginX: e.pageX,
        beginY: e.pageY,
        width: 0,
        height: 0,
        endX: 0,
        endY: 0,
      },
    });
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
    let tempArray = this.state.arrayActive;
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
    for (let i = 0; i < this.state.arrayActive.length; i++) {
      //изменение размеров
      if (this.state.arrayActive[i].changeSize === true) {
        console.log(this.state.arrayActive[i]);
        tempArray[i] = {
          beginX: this.state.arrayActive[i].beginX,
          beginY: this.state.arrayActive[i].beginY,
          width: e.pageX - this.state.arrayActive[i].beginX!,
          height: e.pageY - this.state.arrayActive[i].beginY!,
          endX: e.pageX,
          endY: e.pageY,
          moveFlag: false,
          changeSize: true,
        };
        this.setState({ arrayActive: tempArray });
      }
    }
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
            {this.state.array.map((item, pos) => {
              return (
                <>
                  <div
                    className="div-selected"
                    onMouseDown={(e) => {
                      this.onDivDown(e, pos);
                    }}
                    onMouseMove={(e) => {
                      this.onDivMove(e);
                    }}
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

            {this.state.arrayActive.map((item, pos) => {
              return (
                <>
                  <div
                    className="divActive"
                    onMouseDown={(e) => {
                      this.mouseDownActive(e, pos);
                    }}
                    onMouseMove={(e) => {
                      this.onDivMoveActive(e);
                    }}
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
              className="div-selected1"
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
          <div className="container">
            <div className="row">
              <div className="col s12 board">
                <table className="simple-board">
                  <tbody>{rows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

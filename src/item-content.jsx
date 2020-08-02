import { useState, useRef } from "react";
import React from "react";
import { Button, Popover, OverlayTrigger, Form, ButtonToolbar } from "react-bootstrap";


const DRAG_DIRECTION_NONE = "";
const DRAG_DIRECTION_ROW = "row";
const DRAG_DIRECTION_COLUMN = "column";

const defaultDrageState = {
  column: -1,
  row: -1,
  startPoint: null,
  direction: DRAG_DIRECTION_NONE,
  dropIndex: -1
};


function indexValue(from, to, arr = []) {
  if (from < to) {
    let start = arr.slice(0, from),
      between = arr.slice(from + 1, to + 1),
      end = arr.slice(to + 1);

    return [...start, ...between, arr[from], ...end];
  }
  if (from > to) {
    let start = arr.slice(0, to),
      between = arr.slice(to, from),
      end = arr.slice(from + 1);
    return [...start, arr[from], ...between, ...end];
  }
  return arr;
}


export default props => {

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);


  let { heads = [], rows = [], onDragEnd } = props;
  let [dragState, setDragState] = useState({ ...defaultDrageState });

  const headElement = useRef(null),
    rowElement = useRef(null),
    preview = useRef(null);


  if (dragState.direction === DRAG_DIRECTION_COLUMN) {
    heads = indexValue(dragState.column, dragState.dropIndex, heads);
    rows = rows.map(x => indexValue(dragState.column, dragState.dropIndex, x));
  }

  if (dragState.direction === DRAG_DIRECTION_ROW) {
    rows = indexValue(dragState.row, dragState.dropIndex, rows);
  }


  const handleClick = event => {
    setShow(!show);
    // setTarget(event.target);
  };

  const statusChange = e => {
    handleClick();
  }

  const popover = (

    <Popover id="popover-basic">
      <Popover.Content >
        <Button className='actionsPopOver text-center p-2' onClick={statusChange}>Done</Button>
        <Button className='actionsPopOver text-center p-2' onClick={statusChange}>Testing</Button>
        <Button className='actionsPopOver text-center p-2' onClick={statusChange}>Pending</Button>
        <Button className='actionsPopOver text-center p-2' onClick={statusChange}>Stuck</Button>
        <Button className='actionsPopOver text-center' onClick={statusChange}>Working</Button>
      </Popover.Content>
    </Popover>
  );

// debugger
  return (
    <div className='item-values'>
      <table cellpadding="10">
        <thead>
          <tr ref={headElement}>
            {heads.map((x, i) => {
              if (x == "Things to do") {
                return (
                  <th className={`title_${heads[i]}`} key={i}><i class="fa fa-chevron-circle-down pr-3" aria-hidden="true"></i>{x}</th>
                )
              } else {
                return (
                  <th className={`title_${heads[i]}`} key={i}>{x}</th>
                )
              }
            }
            )}
          </tr>
        </thead>
        <tbody ref={rowElement}>
          {rows.map((x = [], i) => (
            <tr key={i} style={{ background: "#f2f2f2" }}>
              {x.map((y, j) => {
                return (
                  <td
                    className={heads[j]}
                    key={j}
                    style={{
                      cursor: dragState.direction ? "move" : "grab",
                      opacity:
                        dragState.direction === DRAG_DIRECTION_COLUMN
                          ? dragState.dropIndex === j
                            ? 0.5
                            : 1
                          : dragState.direction === DRAG_DIRECTION_ROW
                            ? dragState.dropIndex === i
                              ? 0.5
                              : 1
                            : 1,
                      backgroundColor: y == 'Working' ? "#ffa600" :
                        y == 'Stuck' ? '#f41000' : y == 'Pending' ? '#445199' : y == 'Urgent' ? "rgb(244, 16, 0)" : y == 'High' ? "#445199" : y == 'Medium' ? "#89b8eb" : '',
                      color: y != 'Done' && heads[j] == 'Status' ? "#fff" : y != 'Low' && heads[j] == 'Priority' ? "#fff" : '',
                    }}
                    draggable="true"
                    onDragStart={e => {
                      console.log('onDragStart');
                      e.dataTransfer.setDragImage(preview.current, 0, 0);
                      setDragState({
                        ...dragState,
                        row: i,
                        column: j,
                        startPoint: {
                          x: e.pageX,
                          y: e.pageY
                        }
                      });
                    }}
                    onDragEnter={e => {
                      console.log("onDragEnter");
                      if (!dragState.direction) {
                        if (dragState.column !== j) {
                          setDragState({
                            ...dragState,
                            direction: DRAG_DIRECTION_COLUMN,
                            dropIndex: j
                          });
                          return;
                        }
                        if (dragState.row !== i) {
                          setDragState({
                            ...dragState,
                            direction: DRAG_DIRECTION_ROW,
                            dropIndex: i
                          });
                          return;
                        }
                        return;
                      }

                      if (dragState.direction === DRAG_DIRECTION_COLUMN) {
                        if (j !== dragState.dropIndex) {
                          setDragState({
                            ...dragState,
                            dropIndex: j
                          });
                        }
                        return;
                      }
                      if (dragState.direction === DRAG_DIRECTION_ROW) {
                        if (i !== dragState.dropIndex) {
                          setDragState({
                            ...dragState,
                            dropIndex: i
                          });
                        }
                        return;
                      }
                    }}
                    onDragEnd={() => {
                      console.log('onDragEnd');
                      onDragEnd(
                        dragState.direction,
                        dragState.direction === DRAG_DIRECTION_COLUMN
                          ? dragState.column
                          : dragState.row,
                        dragState.dropIndex,
                        { heads, rows }
                      );
                      setDragState({ ...defaultDrageState });
                    }}
                    onClick={e => {
                      if (e.target.className == 'Status') {
                        handleClick();
                      }
                    }}
                  >
                    {
                      y == "Working" ?
                        <ButtonToolbar ref={ref}>
                          <OverlayTrigger trigger="click" placement="bottom" overlay={popover} container={ref.current} show={show} target={y}>
                            <Button className="" onClick={handleClick} style={{
                              backgroundColor: 'transparent', border: 'none', color: y == 'Done' ? "#000" : '', boxShadow: "none"
                            }}>
                              {y}
                            </Button>
                          </OverlayTrigger>
                        </ButtonToolbar> :
                        <>
                          {y}
                          {heads[j] == 'Things to do' ? <i class="fa fa-comment" aria-hidden="true"></i> : ''}
                        </>
                    }
                  </td>
                )
              }
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        ref={preview}
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden"
        }}
      />
    </div>
  );
};


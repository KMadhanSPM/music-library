import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ItemDragging from "./item-content";
import { Button, Popover, OverlayTrigger, Form, ButtonToolbar } from "react-bootstrap";

const columnTitle = [

    { name: 'Date', icon: <i className="fa fa-calendar" aria-hidden="true"></i> },
    { name: 'Info', icon: <i className="fa fa-flag" aria-hidden="true"></i> },

    { name: 'People', icon: <i className="fa fa-user-plus" aria-hidden="true"></i> },
    { name: 'Projects', icon: <i className="fa fa-bell" aria-hidden="true"></i> },
    { name: 'Services', icon: <i className="fa fa-download" aria-hidden="true"></i> },
];


function ItemList() {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const ref = useRef(null);


    const handleClick = event => {
        setShow(!show);
        setTarget(event.target);
    };

    let [data, setData] = useState({
        heads: ["Things to do", "Owner", "Status", "Due Date", "Priority", "Contact"],
        rows: [
            ["New Item", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Working", "Apr 3", "Urgent", 99898898],
            ["Item", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Done", "Sep 9", "Urgent", 99898898],
            ["Item 3", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Stuck", "Apr 1", "High", 99898898],
            ["New Item", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Pending", "Apr 6", "Medium", 99898898],
            ["Item 4", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Stuck", "Apr 1", "High", 99898898],
            ["Item 2", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Pending", "Apr 9", "Low", 99898898],
            ["Item", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Done", "Sep 9", "Urgent", 99898898],
            ["Item 3", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Done", "Apr 1", "High", 99898898],
            ["New Item", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Pending", "Apr 6", "Medium", 99898898],
            ["Item 4", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Stuck", "Apr 1", "High", 99898898],
        ]
    });

    const addRowValues = event => {
        setData(prevState => {
            prevState.rows.push(["New", <i class="fa fa-user-circle" aria-hidden="true"></i>, "Stuck", "Sep 15", "Medium", 99898898])
            return { ...prevState, rows: prevState.rows }
        })
    };

    const addColumnValues = event => {
        setData(prevState => {
            prevState.heads.push(event.target.innerText)

            prevState.rows.map((x) => {
                return (
                    x.push("0")
                )
            })
            setShow(false);
            return { ...prevState, rows: prevState.rows, heads: prevState.heads }
        })
    };


    const popover = (

        <Popover id="popover-basic">
            <Popover.Content>
                {columnTitle.map(({ name, icon }) => (
                    <Button onClick={addColumnValues} className='actionsPopOver p-2'>{icon}{name}</Button>
                ))}
                <Button onClick={addColumnValues} className='actionsPopOver more'>More Icons</Button>
            </Popover.Content>
        </Popover>
    );

    const useOutsideClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", useOutsideClick);
    })

    return (
        <div className='pb-5  pt-5 pr-5'>

            <ItemDragging
                heads={data.heads}
                rows={data.rows}
                onDragEnd={(type, from, to, newData) => {
                    console.log({
                        type,
                        from,
                        to,
                        newData
                    });
                    setData(newData);
                }}
            />

            <ButtonToolbar ref={ref}>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover} container={ref.current} show={show} target={target}>
                    <Button className="column-list" onClick={handleClick}>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </Button>
                </OverlayTrigger>
            </ButtonToolbar>

            <div className="addRow">
                <Button onClick={addRowValues}>+ Add</Button>
            </div>

        </div>
    );
}

export default ItemList;


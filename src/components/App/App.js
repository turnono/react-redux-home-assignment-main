import React, { useEffect, useState } from "react";
import { arrayMove } from "react-sortable-hoc";
import { AutoSizer, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteRowByIndex,
  selectColumns,
  selectRows,
  setColumns,
  setRows,
} from "../../features";
import { AlertComponent } from "../Alert/AlertComponent";
import { Sortables } from "../Sortable/Sortable";

const { SortableTable, headerRenderer, rowRenderer, headerRowRenderer } =
  Sortables();

const SortableComponent = () => {
  const tableColumns = useSelector(selectColumns);
  const tableRows = useSelector(selectRows);
  const dispatch = useDispatch();

  const [alert, setAlert] = useState();

  const moveColumn = (from, to) => {
    const columns = arrayMove(tableColumns, from, to);
    dispatch(setColumns(columns));
  };

  const moveRow = ({ oldIndex, newIndex }) => {
    const rows = arrayMove(tableRows, oldIndex, newIndex);
    dispatch(setRows(rows));
  };

  useEffect(() => {
    const newRows = tableRows?.map((row) => {
      const newRow = { ...row };
      newRow.workerName = ` ${row.workerName}`;
      return newRow;
    });

    dispatch(setRows(newRows));
  }, []);

  const clickHandler = (e) => {
    if (
      e?.target?.id === "chart" ||
      e?.target?.["farthestViewportElement"]?.id === "chart"
    ) {
      setAlert({
        header: "Chart",
        type: "success",
        text: "This feature is still in development!",
        show: true,
        index: e.target?.ariaRowIndex,
      });
    } else if (e?.target?.id === "elipsis") {
      const rowIndex = alert?.index;
      dispatch(deleteRowByIndex(Number(rowIndex)));
      setAlert({
        header: "Deleted!",
        type: "warning",
        text: "You have deleted row at index: " + e?.target?.ariaRowIndex,
        show: true,
        index: e?.target?.ariaRowIndex,
        backgroundColor: "red",
        closeText: "Ok",
      });
    }
  };

  const onCloseAlert = () => {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  };

  return (
    <>
      <AutoSizer>
        {() => (
          <SortableTable
            width={980}
            height={600}
            headerHeight={20}
            rowHeight={30}
            onSortEnd={({ oldIndex, newIndex }) =>
              moveRow({ oldIndex, newIndex })
            }
            pressDelay={150}
            axis={"y"}
            lockAxis={"y"}
            data={tableRows}
            rowCount={tableRows?.length}
            rowGetter={({ index }) => tableRows[index]}
            headerRowRenderer={headerRowRenderer((from, to) =>
              moveColumn(from, to)
            )}
            rowRenderer={(row) => rowRenderer({ ...row, clickHandler })}
          >
            {tableColumns?.map((column, index) => (
              <Column
                key={index}
                {...column}
                flexShrink={0}
                columnData={{ index }}
                headerRenderer={headerRenderer}
              />
            ))}
          </SortableTable>
        )}
      </AutoSizer>
      <AlertComponent alert={alert} onClosePress={onCloseAlert} />
    </>
  );
};

export default SortableComponent;

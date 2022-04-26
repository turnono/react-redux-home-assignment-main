import React, { Fragment } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { defaultTableHeaderRenderer, Table } from "react-virtualized";
import { ActionIcons } from "../ActionIcons/ActionIcons";
import { BiRadioCircle } from "react-icons/all";

export const Sortables = () => {
  const SortableTable = SortableContainer(Table);

  const SortableHeaderRenderer = SortableElement(({ ...props }) => (
    <div>{defaultTableHeaderRenderer(props)}</div>
  ));

  const getRowStyle = (style) => ({
    display: "flex",
    width: style?.width * 2,
    height: style?.height,
    flexShrink: 0,
  });

  const getColor = (status) =>
    status === "green"
      ? "green"
      : status === "orange"
      ? "orange"
      : "transparent";

  const SortableHeader = SortableElement(({ ...props }) =>
    defaultTableHeaderRenderer(props)
  );

  const DefaultTableHeaderRowRenderer = ({ className, columns, style }) => {
    return (
      <div
        className={className}
        role="row"
        style={{ ...style, position: "sticky", top: 0, zIndex: 1 }}
      >
        {React.Children.map(columns, (column, index) => {
          return (
            <SortableHeader
              style={style}
              {...column?.props?.children?.props}
              index={index}
            />
          );
        })}
      </div>
    );
  };

  const SortableHeaderRowRenderer = SortableContainer(
    DefaultTableHeaderRowRenderer
  );

  const DefaultRowRenderer = ({
    className,
    columns,
    style,
    rowData,
    clickHandler,
    value,
  }) => {
    columns.pop();
    const rows = [
      ...columns,
      ...[
        <ActionIcons
          key={"Row1-Col6"}
          ariaRowindex={value.index}
          onClick={clickHandler}
        />,
      ],
    ];

    return (
      <div className={className} role="row" style={style}>
        <div style={getRowStyle(style)}>
          {rows.map((row) => {
            if (row.props?.title?.startsWith(" ")) {
              return (
                <Fragment key={row?.props?.title}>
                  <BiRadioCircle
                    style={{ alignSelf: "center", strokeWidth: 4 }}
                    size={20}
                    color={getColor(rowData?.status)}
                  />
                  {row}
                </Fragment>
              );
            }
            return row;
          })}
        </div>
      </div>
    );
  };

  const headerRenderer = ({ ...props }) => (
    <SortableHeaderRenderer index={props?.columnData?.index} {...props} />
  );

  const SortableRowRenderer = SortableElement(DefaultRowRenderer);

  const rowRenderer = ({ ...props }) => (
    <SortableRowRenderer value={{ index: props?.index }} {...props} />
  );

  const headerRowRenderer =
    (moveColumn) =>
    ({ ...props }) =>
      (
        <SortableHeaderRowRenderer
          axis="x"
          lockAxis="x"
          onSortEnd={({ oldIndex, newIndex }) => moveColumn(oldIndex, newIndex)}
          shouldCancelStart={(x) => x.target?.innerHTML === "Actions"}
          {...props}
        />
      );
  return { SortableTable, headerRenderer, rowRenderer, headerRowRenderer };
};

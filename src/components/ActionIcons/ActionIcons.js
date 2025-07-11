import React from "react";
import { AiOutlineBarChart, BsThreeDotsVertical } from "react-icons/all";
import * as PropTypes from "prop-types";

export const ActionIcons = ({ ariaRowindex, onClick }) => (
  <div style={{ whiteSpace: "nowrap", width: "5%", alignSelf: "center" }}>
    <AiOutlineBarChart
      id={"chart"}
      aria-rowindex={ariaRowindex}
      style={{ cursor: "pointer", alignSelf: "center" }}
      onClick={onClick}
      size={20}
    />{" "}
    <BsThreeDotsVertical
      id={"elipsis"}
      aria-rowindex={ariaRowindex}
      style={{ cursor: "pointer", alignSelf: "center" }}
      onClick={onClick}
      size={20}
    />
  </div>
);

ActionIcons.propTypes = {
  ariaRowindex: PropTypes.any,
  onClick: PropTypes.any,
};

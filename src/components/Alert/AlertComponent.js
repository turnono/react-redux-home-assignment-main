import React from "react";
import Alert from "react-popup-alert";
import * as PropTypes from "prop-types";

export const AlertComponent = ({ alert, onClosePress }) => {
  const getAlertStyles = () => ({
    position: "absolute",
    top: "250px",
    left: "50%",
    width: "40%",
    height: "150px",
    border: "solid 1px grey",
    display: "block",
    paddingLeft: "10px",
    paddingRight: "10px",
    backgroundColor: alert?.backgroundColor ?? "darkolivegreen",
    borderRadius: "4px",
    color: "#ffffff",
    fontFamily: "sans-serif",
    fontSize: "16px",
  });

  const getButtonStyles = () => ({
    minWidth: "190px",
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "15px 3px",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    fontSize: "16px",
  });

  return (
    <Alert
      header={alert?.header}
      btnText={alert?.closeText ?? "Close"}
      text={alert?.text}
      type={alert?.type}
      show={alert?.show}
      onClosePress={onClosePress}
      pressCloseOnOutsideClick={true}
      showBorderBottom={true}
      alertStyles={getAlertStyles()}
      headerStyles={{}}
      textStyles={{}}
      buttonStyles={getButtonStyles()}
    />
  );
};

AlertComponent.propTypes = {
  alert: PropTypes.shape({
    show: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
  }),
  onClosePress: PropTypes.func,
};

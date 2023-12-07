import React from "react";

const RButton = (props) => {
  const {
    buttonName,
    handleButtonClick,
    externalClassName,
    bgColor,
    color,
    border,
    text,
    type,
  } = props;
  return (
    <button
      className={`defaultButtonClass ${text ?? ""} ${border ?? "border-none"} ${
        bgColor ?? "bg-secondary"
      } ${color ?? "text-black"} rounded-full ${externalClassName}`}
      type={type}
      onClick={handleButtonClick}
    >
      {buttonName}
    </button>
  );
};

export default RButton;

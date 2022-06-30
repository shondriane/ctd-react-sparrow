import React, { useEffect } from "react";
import PropTypes from "prop-types";

const InputWithLabel = ({
  children,//generic label for title
  value,
  type = "text",
  id,
  onInputChange,
}) => {
    //function for autofocus
  const inputRef = React.useRef();
  function focusSearch() {
    inputRef.current.focus();
  }
  useEffect(focusSearch);
  
InputWithLabel.propTypes ={
  children: PropTypes.object,
  value:PropTypes.string,
  type:PropTypes.string,
  id:PropTypes.string,
  onInputChange:PropTypes.func
}
  
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

export default InputWithLabel;

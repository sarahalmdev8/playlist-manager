import React from "react";

const RadioButton = ({ onClick, label, ...props }) => (
  <div onClick={onClick} style={{ marginTop: '0.25rem', marginBottom: '0.25rem' }}>
    <input type="radio" onChange={onClick} {...props} />
    <label>{label}</label>
  </div>
);

export default RadioButton

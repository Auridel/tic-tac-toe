import React from "react";

import "./inputField.scss";

const InputField = ({value, error, showError, onChange, inputId, type = "text"}) => {
    return (
        <div className="form-input__wrapper">
            <input
                onChange={onChange}
                value={value}
                type={type}
                className={`form-input__input${error? " alert" : ""}`}
                id={inputId? inputId : ""}/>
            <span className="form-input__alert">{showError()}</span>
        </div>
    )
};

export default InputField;
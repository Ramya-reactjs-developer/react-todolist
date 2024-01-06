import React, { useRef } from "react";
import { useEffect } from "react";
import { ButtonCom } from "../button/ButtonCom";
import { CancelButton } from "../button/CancelButton";

export default function Modal({ taskTitlename, show, onClose, label, edit, isDelete, confirm, task, onChangeHandle, handleKeyPress, handleClick, text }) {
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }


    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);


  const textareaRef = useRef(null);
  const taskTitlename1 = {};

  const handleFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  return (
    <div className="modelBack">
      <div className={show ? "modal-show" : "modal"}>
        <div className="modalHeader">
          {edit || isDelete || confirm ? <p className="modeltext">{text}</p> : null}

          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="modalContent">
          {isDelete || confirm ? (
            <>
              <textarea className="titleName"
                ref={textareaRef}
                value={taskTitlename}
                onFocus={handleFocus}
                readOnly
                style={{ overflowY: "scroll" }}
              >{taskTitlename}</textarea>
            </>
          ) : (
            <textarea
              type="text"
              name="task"
              className="modalInput"
              onChange={onChangeHandle}
              onKeyPress={handleKeyPress}
              value={task}
              autoFocus
              autoComplete="off"

            />
          )}
        </div>

        <div className="modalFooter">

          <ButtonCom
            onClick={handleClick}
            label={label}
          />
          <CancelButton onClick={onClose}
            label={label}
          />

        </div>
      </div>
    </div>
  );
}

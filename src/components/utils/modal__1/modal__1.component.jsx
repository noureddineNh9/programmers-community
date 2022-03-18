import React from "react";
import "./modal__1.styles.scss";

function Modal({ task, closeModal, children, ...othersProps }) {
   return (
      <div className={`${othersProps.className} modal__1 `}>
         <div className="modal__wrapper">
            <button onClick={closeModal} className="close"></button>
            <div className="modal__content">{children}</div>
         </div>
      </div>
   );
}

export default Modal;

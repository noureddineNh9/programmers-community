import React from "react";
import "./modal__1.styles.scss";

function Modal({ closeModal, children, ...othersProps }) {
   return (
      <div className={`${othersProps.className} modal__1 `}>
         <div className="modal__1__wrapper">
            <button onClick={closeModal} className="close"></button>
            <div className="modal__1__content">{children}</div>
         </div>
      </div>
   );
}

export default Modal;

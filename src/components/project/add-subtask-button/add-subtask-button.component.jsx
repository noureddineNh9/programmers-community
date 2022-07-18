import React, { useState } from "react";
import "./add-subtask-button.styles.scss";

import Modal from "../../utils/modal__1/modal__1.component";
import axios from "axios";
import { BASE_URL } from "../../../api/api";
import { addSubTask } from "../../../redux/projects/projects.actions";
import { connect } from "react-redux";
import Form from "../../utils/Form";
import FormInput from "../../utils/FormInput";

function AddSubTaskButton({ taskId, className, children, addSubTaskToRedux }) {
   const [modalActive, setModalActive] = useState(false);

   const initialValues = {
      titre: "",
      description: "",
      id_tache: taskId,
      id_programmeur: 25,
   };

   const handleSubmit = async (FormValues) => {
      console.log(FormValues);

      try {
         const res = await axios.post(BASE_URL + "sousTache", FormValues);
         console.log(res.data);
         addSubTaskToRedux(res.data);
      } catch (err) {
         console.log(err);
      }

      //console.log(FormValue);
   };

   // *********** Modal *****************
   const openModal = () => {
      setModalActive(true);
      document.querySelector("body").classList.add("modal__active");
   };
   const closeModal = () => {
      setModalActive(false);
      document.querySelector("body").classList.remove("modal__active");
   };
   // ***********************************

   return (
      <>
         <button onClick={openModal} className={`${className && className}`}>
            {children}
         </button>
         <Modal
            closeModal={closeModal}
            className={`${modalActive ? "active" : ""}`}
         >
            <div>
               <Form
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  className="form__1"
               >
                  <FormInput name="titre" className="max-w-xl" />
                  <FormInput name="description" type="textarea" />
               </Form>
            </div>
         </Modal>
      </>
   );
}

const mapDispatchToProps = (dispatch) => ({
   addSubTaskToRedux: (subtask) => dispatch(addSubTask(subtask)),
});

export default connect(null, mapDispatchToProps)(AddSubTaskButton);

import React, { useState } from "react";
import "./add-task-button.styles.scss";

import AddTaskModal from "../../utils/modal__1/modal__1.component";
import axios from "axios";
import { BASE_URL } from "../../../api/api";
import { addTask } from "../../../redux/projects/projects.actions";
import { connect } from "react-redux";

function AddTaskButton({ projectId, addTaskToRedux }) {
   const [modalActive, setModalActive] = useState(false);
   const [FormValue, setFormValue] = useState({
      titre: "",
      description: "",
      priorite: "",
      id_projet: projectId,
   });
   const [FormError, setFormError] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post(BASE_URL + "tache", FormValue);
         addTaskToRedux(res.data);
         closeModal();
      } catch (err) {
         if (err.response.data) {
            setFormError(err.response.data);
         } else {
            console.log("error !");
         }
      }

      //console.log(FormValue);
   };

   const handleChange = (e) => {
      setFormValue({
         ...FormValue,
         [e.target.name]: e.target.value,
      });
   };
   // *********** AddTaskModal *****************
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
         <div onClick={openModal} className="add__task border p-4 text-center">
            <p className="text-green-600 font-medium">Add new task</p>
         </div>
         <AddTaskModal
            closeModal={closeModal}
            className={`${modalActive ? "active" : ""}`}
         >
            <div>
               {FormError && (
                  <div className="max-w-xl mx-auto border-b border-red-500 text-red-600 text-center p-2 mb-8">
                     <p>{FormError}</p>
                  </div>
               )}
               <form className="form__1" onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="titre"
                     placeholder="titre"
                     className="max-w-xl block"
                     onChange={handleChange}
                  />
                  <textarea
                     name="description"
                     placeholder="description"
                     rows="4"
                     onChange={handleChange}
                  ></textarea>
                  <input
                     type="text"
                     name="priorite"
                     placeholder="priorite"
                     className="max-w-xl block"
                     onChange={handleChange}
                  />
                  <input type="submit" value="submit" />
               </form>
            </div>
         </AddTaskModal>
      </>
   );
}

const mapDispatchToProps = (dispatch) => ({
   addTaskToRedux: (task) => dispatch(addTask(task)),
});

export default connect(null, mapDispatchToProps)(AddTaskButton);

import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import Modal from "../../components/utils/modal__1/modal__1.component";

function AllProjects(props) {
   const [modalActive, setModalActive] = useState(false);
   const [FormValue, setFormValue] = useState({
      titre: "",
      description: "",
      id_proprietaire: props.currentUser.id,
   });
   const [FormError, setFormError] = useState("");
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         await axios.post(BASE_URL + "projet", FormValue);
         console.log("ok");
         setModalActive(false);
      } catch (err) {
         console.log("error !");
      }

      //console.log(FormValue);
   };

   const handleChange = (e) => {
      setFormValue({
         ...FormValue,
         [e.target.name]: e.target.value,
      });
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
      <div className="p-8">
         <div className="flex justify-end ">
            <button onClick={openModal} className="button__2">
               Add Project
            </button>
         </div>
         <div className="">
            <h2>My Projects</h2>
            {props.projects &&
               props.projects.map((project, index) => (
                  <div key={index}>
                     <Link to={`${props.match.path + "/" + project.id}`}>
                        <h4>{project.titre}</h4>
                     </Link>
                  </div>
               ))}
         </div>

         <Modal
            closeModal={closeModal}
            className={`${modalActive ? "active" : ""}`}
         >
            <div>
               <form className="form__1" onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="titre"
                     placeholder="title"
                     className="max-w-xl block"
                     onChange={handleChange}
                  />
                  <textarea
                     name="description"
                     placeholder="description"
                     rows="4"
                     onChange={handleChange}
                  ></textarea>
                  <input type="submit" value="submit" />
               </form>
            </div>
         </Modal>
      </div>
   );
}

const mapStateToProps = ({ projects, user }) => ({
   projects: projects,
   currentUser: user.currentUser,
});

export default connect(mapStateToProps)(AllProjects);

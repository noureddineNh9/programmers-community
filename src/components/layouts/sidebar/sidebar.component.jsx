import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

import "./sidebar.styles.scss";

import { connect } from "react-redux";
import { setCurrentUser } from "../../../redux/user/user.actions";

const Navbar = (props) => {
   useEffect(() => {
      // DOM ready
      // If a link has a dropdown, add sub menu toggle.
      $(".nav__link").click(() => {
         $("#navbar-checkbox").prop("checked", false);
      });
      $("nav .nav__link:not(:only-child)").click(function (e) {
         $(this).toggleClass("active");
         $(this).siblings(".nav__dropdown").slideToggle();
         // Close one dropdown when selecting another
         $(".nav__dropdown").not($(this).siblings()).slideUp(140);
         e.stopPropagation();
      });
      // Clicking away from dropdown will remove the dropdown class
      $("html").click(function () {
         $(".nav__dropdown").slideUp(140);
         $("nav .nav__link").removeClass("active");
      });
      // Toggle open and close nav styles on click
      $("#nav-toggle").click(function () {
         //$("nav ul").toggle();
      });
      // Hamburger to X toggle
      $("#nav-toggle").on("click", function () {
         this.classList.toggle("active");
      });
   }, []);

   useEffect(() => {
      $(".projects__list .menu__link").click(function (e) {
         $(this).siblings(".dropdown__list").slideToggle(300);
         $(".dropdown__list").not($(this).siblings()).slideUp(140);
      });
   }, [props.projects]);

   return (
      <>
         <input
            className="toggle__checkbox"
            type="checkbox"
            id="toggle-sidebar"
         />
         <label
            id="sidebar-button"
            className="sidebar__button"
            htmlFor="toggle-sidebar"
         >
            <span className="sidebar__icon"></span>
         </label>
         <div className="sidebar border-r bg-gray-100 h-screen p-6">
            <div className="flex  mb-8">
               <img
                  className="w-20 h-20 rounded-xl border border-blue-100 object-cover mr-4"
                  src={props.currentUser.image_profile}
               />
               <div>
                  <h4>
                     {props.currentUser.nom + " " + props.currentUser.prenom}
                  </h4>
               </div>
            </div>

            <ul className="menu">
               <a className="link" href="">
                  <i className="fas fa-user"></i> Profile
               </a>
               <a className="link" href="">
                  <i className="fas fa-comment"></i> Chat
               </a>
               <a className="link" href="">
                  <i className="fas fa-envelope"></i> Email
               </a>
               <Link
                  className="link"
                  to="/signin"
                  onClick={() => {
                     props.setCurrentUser(null);
                  }}
               >
                  <i className="fas fa-sign-out-alt"></i> log out
               </Link>
            </ul>

            <p className="text-xl mb-4">PROJECTS</p>
            <ul className="projects__list">
               {props.projects &&
                  props.projects.map((project, index) => (
                     <li key={index} className="menu__item">
                        <a className="menu__link">{project.titre}</a>
                        <ul className="dropdown__list">
                           <li className="dropdown__item">
                              <Link
                                 className="dropdown__link"
                                 to={`/project/${project.id}/tasks`}
                              >
                                 <i className="fas fa-tasks"></i> Tasks
                              </Link>
                           </li>
                           <li className="dropdown__item">
                              <Link
                                 className="dropdown__link"
                                 to={`/project/${project.id}/discussions`}
                              >
                                 <i className="far fa-comments"></i> Discussions
                              </Link>
                           </li>
                           <li className="dropdown__item">
                              <a className="dropdown__link" href="#">
                                 <i className="far fa-file-alt"></i> Files
                              </a>
                           </li>
                        </ul>
                     </li>
                  ))}
            </ul>
         </div>
      </>
   );
};

const mapStateToProps = ({ user, projects }) => ({
   currentUser: user.currentUser,
   projects: projects,
});
const mapDispatchToProps = (dispatch) => ({
   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

/*

            <h4 className="text-center mb-8"></h4>
            
            <ul className="menu__list">
               <a href="./index.php">
                  <li className="menu__item">
                     <i className="fas fa-home"></i> Home
                  </li>
               </a>
               <Link to="/project">
                  <li className="menu__item">
                     <i className="fas fa-user"></i> Projects
                  </li>
               </Link>
               <a href="#">
                  <li className="menu__item">
                     <i className="fas fa-user"></i> Profile
                  </li>
               </a>
               <a href="#">
                  <li className="menu__item">
                     <i className="fas fa-comment"></i> Chat
                  </li>
               </a>
               <a href="./questions.php">
                  <li className="menu__item">
                     <i className="fas fa-question-circle"></i> Questions
                  </li>
               </a>
               <a href="#">
                  <li className="menu__item">
                     <i className="fas fa-envelope"></i> Email
                  </li>
               </a>
               <Link
                  to="/signin"
                  onClick={() => {
                     props.setCurrentUser(null);
                  }}
               >
                  <li className="menu__item">
                     <i className="fas fa-sign-out-alt"></i> log out
                  </li>
               </Link>
            </ul>

*/

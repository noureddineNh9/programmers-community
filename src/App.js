import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./styles/tailwind.css";
import "./styles/main.scss";

import { BASE_URL } from "./api/api";
import { setProjectsData } from "./redux/projects/projects.actions";

import Sidebar from "./components/layouts/sidebar/sidebar.component";
import HomePage from "./pages/home/home.component";
import ProjectPage from "./pages/project/project.component";
import AllProjects from "./pages/all-projects/all-projects.component";
import NotFound from "./pages/not-found/not-found.component";
import Signin from "./pages/signin/signin.component";
import Signup from "./pages/signup/signup.component";

function App(props) {
   useEffect(() => {
      // * load user from local storage
      const userFromLocalStorage = JSON.parse(
         localStorage.getItem("currentUser")
      );
      if (userFromLocalStorage) {
         props.setCurrentUser(userFromLocalStorage);
      }
      // ******************************
   }, []);

   useEffect(() => {
      if (props.currentUser) {
         loadData();
      }
   }, [props.currentUser]);

   async function loadData() {
      if (props.currentUser) {
         let projects = [];

         try {
            // get all projects for current user
            const projectsResponse = await axios.get(
               BASE_URL + "ProjetsByProprietaire/" + props.currentUser.id
            );
            projects = projectsResponse.data;

            // loop into projects for getting all tasks for each project
            // ************************************************************************************************
            projects.forEach(async (project, projectKey) => {
               const TachesResponse = await axios.get(
                  BASE_URL + "tacheByProjet/" + project.id
               );
               let TachesData = TachesResponse.data;

               projects = projects.map((proj) => {
                  if (proj.id === project.id) {
                     return {
                        ...proj,
                        taches: TachesData,
                     };
                  } else {
                     return proj;
                  }
               });

               // ************************************************************************************************
               // loop into tasks for getting all sub-tasks
               TachesData.forEach(async (tache, tacheKey) => {
                  const SousTachesResponse = await axios.get(
                     BASE_URL + "sousTacheByTache/" + tache.id
                  );
                  let SousTachesData = SousTachesResponse.data;

                  projects[projectKey].taches = projects[projectKey].taches.map(
                     (t) => {
                        if (t.id === tache.id) {
                           return {
                              ...t,
                              sousTaches: SousTachesData,
                           };
                        } else {
                           return t;
                        }
                     }
                  );

                  // ************************************************************************************************
                  SousTachesData.forEach(async (sousTache) => {
                     const AssigneesResponse = await axios.get(
                        BASE_URL + "programmersbySousTache/" + sousTache.id
                     );
                     let AssigneesData = AssigneesResponse.data;

                     projects[projectKey].taches[tacheKey].sousTaches =
                        projects[projectKey].taches[tacheKey].sousTaches.map(
                           (s) => {
                              if (s.id === sousTache.id) {
                                 return {
                                    ...s,
                                    assignee: AssigneesData,
                                 };
                              } else {
                                 return s;
                              }
                           }
                        );

                     props.setProjectsData(projects);
                  });
               });
            });
         } catch (error) {}
      }
   }

   return (
      <div className="App">
         {props.currentUser ? (
            <>
               <Sidebar />
               <div className="content">
                  <Switch>
                     <Route exact path="/" component={HomePage} />
                     <Route exact path="/project" component={AllProjects} />
                     <Route
                        path="/project/:projectId"
                        component={ProjectPage}
                     />
                     <Route path="*" component={NotFound} />
                  </Switch>
               </div>
            </>
         ) : (
            <Switch>
               <Route path="/signin" component={Signin} />
               <Route path="/signup" component={Signup} />
            </Switch>
         )}
      </div>
   );
}

const mapStateToProps = ({ user }) => ({
   currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
   setProjectsData: (projectsData) => dispatch(setProjectsData(projectsData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

import "./project.styles.scss";

import DiscussionsPage from "./discussions-page/discussions.component";
import TasksPage from "./tasks-page/tasks-page.component";

const home = () => <h2>home</h2>;

function Project(props) {
   const [route, setRoute] = useState("");
   const [Project, setProject] = useState(null);

   useEffect(() => {
      //props.addProject({ id: 123, title: "p1" });*
      if (props.projects) {
         const pathName = props.location.pathname;
         const pathNameArr = pathName.split("/");
         if (pathNameArr.length > 3) {
            setRoute(pathNameArr[3]);
         }

         const projectId = props.match.params.projectId;
         const searchProjectResult = props.projects.filter(
            (project) => project.id == projectId
         );
         const projectExist = searchProjectResult.length !== 0;
         if (projectExist) {
            setProject(searchProjectResult[0]);
         } else {
            props.history.push("/notfound");
         }
      }
   }, [props.projects, props.match.params]);

   return (
      <div className="project__page">
         {Project !== null && (
            <>
               <div className="project__nav">
                  <div className="title__section">
                     <h3>Project : {Project.titre}</h3>
                  </div>
                  <div className="links__section">
                     <Link
                        className={`${route === "" && "active"} link`}
                        onClick={() => setRoute("")}
                        to={`${props.match.url}`}
                     >
                        home
                     </Link>
                     <Link
                        className={`${route === "tasks" && "active"} link`}
                        onClick={() => setRoute("tasks")}
                        to={`${props.match.url}/tasks`}
                     >
                        tasks
                     </Link>
                     <Link
                        className={`${
                           route === "discussions" && "active"
                        } link`}
                        onClick={() => setRoute("discussions")}
                        to={`${props.match.url}/discussions`}
                     >
                        discussions
                     </Link>
                  </div>
               </div>
               <div className=" min-h-screen">
                  <Route exact path={props.match.url} component={home} />
                  <Route
                     path={`${props.match.url}/tasks`}
                     component={() => (
                        <TasksPage
                           tasks={Project.taches}
                           projectId={Project.id}
                        />
                     )}
                  />
                  <Route
                     path={`${props.match.url}/discussions`}
                     component={() => <DiscussionsPage />}
                  />
               </div>
            </>
         )}
      </div>
   );
}

const mapStateToProps = ({ projects }) => ({
   projects: projects,
});

export default connect(mapStateToProps)(Project);

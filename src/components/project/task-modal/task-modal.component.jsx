import React, { useEffect, useState } from "react";
import AddSubtaskButton from "../add-subtask-button/add-subtask-button.component";
import "./task-modal.styles.scss";

function TaskModal({ tache, closeModal, ...othersProps }) {
   const [subtasksRoute, setSubtasksRoute] = useState("subtasks");
   const [subtasksProgress, setSubtasksProgress] = useState(null);

   useEffect(() => {
      if (tache) {
         const subtasksCompleted = tache.sousTaches.filter(
            (sousTache) => sousTache.completed
         ).length;
         const subtasksProgress = parseInt(
            (subtasksCompleted / tache.sousTaches.length) * 100
         );
         setSubtasksProgress(subtasksProgress);
      }
   }, [tache]);

   return (
      <div className={`${othersProps.className} task__modal `}>
         <div className="modal__wrapper">
            <button onClick={closeModal} className="close"></button>
            <div>
               {tache && (
                  <>
                     <div className="h-10 px-8 py-4 ">
                        <span className="bg-slate-100 px-5 font-light py-1 rounded-3xl inline-block">
                           {tache.status}
                           <i className="ml-3 text-xl fas fa-angle-down"></i>
                        </span>
                     </div>
                     <div className="p-8">
                        <h3 className="my-1">{tache.titre}</h3>
                        <p className="">{tache.description}</p>
                     </div>
                     <hr />

                     <div className="p-8">
                        <h4>
                           <i className="far fa-calendar-alt text-3xl text-gray-800"></i>
                           {"  "}
                           Created At
                        </h4>
                        <p>{tache.creer_on}</p>
                     </div>

                     <div className="px-4 bg-slate-100">
                        <span
                           onClick={() => setSubtasksRoute("subtasks")}
                           className={`${
                              subtasksRoute === "subtasks" && "active"
                           } link`}
                        >
                           <i className="fas fa-tasks"></i> subtasks
                        </span>
                        <span
                           onClick={() => setSubtasksRoute("comments")}
                           className={`${
                              subtasksRoute === "comments" && "active"
                           } link`}
                        >
                           <i className="far fa-comments"></i> comments
                        </span>
                     </div>

                     <div>
                        {subtasksRoute === "subtasks" ? (
                           <>
                              {tache.sousTaches.length !== 0 ? (
                                 <div className="p-8">
                                    {subtasksProgress !== null && (
                                       <div className="flex flex-wrap justify-between items-center mb-4">
                                          <h5 className="mr-20">
                                             Subtasks Progress :
                                          </h5>
                                          <div className="flex  items-center">
                                             <span className="mr-4">
                                                {subtasksProgress}%
                                             </span>
                                             <div className="w-64 bg-gray-200 h-3 rounded-md">
                                                <div
                                                   className="bg-green-500 h-3 rounded-md"
                                                   style={{
                                                      width: `${subtasksProgress}%`,
                                                   }}
                                                ></div>
                                             </div>
                                          </div>
                                       </div>
                                    )}
                                    {tache.sousTaches
                                       .filter(
                                          (sousTache) =>
                                             sousTache.completed == false
                                       )
                                       .map((sousTache, index) => (
                                          <div
                                             key={index}
                                             className="subtask ml-4 h-16 items-center flex justify-between border-b mb-4"
                                          >
                                             <div className="flex items-center">
                                                <i className="fas fa-spinner mr-3"></i>
                                                <p>{sousTache.titre}</p>
                                             </div>

                                             <span href="#" className="">
                                                <img
                                                   className="h-8 w-8 object-cover rounded-full border "
                                                   src={
                                                      sousTache.assignee
                                                         .image_profile
                                                   }
                                                   alt=""
                                                />
                                             </span>
                                          </div>
                                       ))}
                                    {tache.sousTaches
                                       .filter(
                                          (sousTache) =>
                                             sousTache.completed === true
                                       )
                                       .map((sousTache, index) => (
                                          <div
                                             key={index}
                                             className="subtask ml-4 h-16 items-center flex justify-between border-b mb-4"
                                          >
                                             <div className="flex items-center">
                                                <i className="fas fa-check mr-3"></i>
                                                <p>{sousTache.titre}</p>
                                             </div>

                                             <span
                                                key={index}
                                                href="#"
                                                className=""
                                             >
                                                <img
                                                   className="h-8 w-8 object-cover rounded-full border "
                                                   src={
                                                      sousTache.assignee
                                                         .image_profile
                                                   }
                                                   alt=""
                                                />
                                             </span>
                                          </div>
                                       ))}
                                 </div>
                              ) : (
                                 <div className="p-8">no subtasks</div>
                              )}
                              <div className="px-8 py-4 bg-slate-100">
                                 <AddSubtaskButton
                                    taskId={tache.id}
                                    className="text-gray-500"
                                 >
                                    add subtask
                                 </AddSubtaskButton>
                              </div>
                           </>
                        ) : subtasksRoute === "comments" ? (
                           <>
                              <div>no comments</div>
                           </>
                        ) : (
                           <></>
                        )}
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default TaskModal;

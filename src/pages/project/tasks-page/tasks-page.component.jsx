import React, { useState } from "react";
import "./tasks-page.styles.scss";

import TasksSection from "../../../components/project/tasks-section/tasks-section.component";
import TaskModal from "../../../components/project/task-modal/task-modal.component";
import AddTaskModal from "../../../components/utils/modal__1/modal__1.component";
import AddTaskButton from "../../../components/project/add-task-button/add-task-button.component";

function TasksPage({ tasks, projectId }) {
   const [taskInModal, setTaskInModal] = useState(null);
   const [modalActive, setModalActive] = useState(false);

   const toDoTasks = tasks.filter((task) => task.status === "aFaire");
   const inProgressTasks = tasks.filter((task) => task.status === "enCours");
   const completedTasks = tasks.filter((task) => task.status === "complete");

   const showTaskInModal = (taskId) => {
      const task = tasks.filter((task) => task.id == taskId)[0];
      setTaskInModal(task);
      setModalActive(true);

      document.querySelector("body").classList.add("modal__active");
   };

   const hideTaskInModal = () => {
      setTaskInModal(null);
      setModalActive(false);
      document.querySelector("body").classList.remove("modal__active");
   };

   return (
      <div className="p-8 flex flex-wrap gap-6">
         <TasksSection
            showTaskInModal={showTaskInModal}
            type="To do"
            tasks={toDoTasks}
         >
            <AddTaskButton projectId={projectId} />
         </TasksSection>
         {inProgressTasks.length != 0 && (
            <TasksSection
               showTaskInModal={showTaskInModal}
               type="In Progress"
               tasks={inProgressTasks}
            />
         )}
         {completedTasks.length != 0 && (
            <TasksSection
               showTaskInModal={showTaskInModal}
               type="Completed"
               tasks={completedTasks}
            />
         )}

         <TaskModal
            tache={taskInModal}
            closeModal={hideTaskInModal}
            className={`${modalActive ? "active" : ""}`}
         />

         {/*
         <div className={`${modalActive && "active"} task__modal`}>
            <button onClick={hideTaskInModal} className="close"></button>
            <div className="modal__container">
               {taskInModal && (
                  <>
                     <div className="flex h-16"></div>
                     <div className="p-8">
                        <h3 className="my-1">{taskInModal.title}</h3>
                        <p className="">{taskInModal.description}</p>
                     </div>
                     <hr />

                     <div className="p-8">
                        <h4>
                           <i class="far fa-calendar-alt text-3xl text-gray-800"></i>
                           {"  "}
                           Created At
                        </h4>
                        <p>{taskInModal.createdAt}</p>
                     </div>
                     <div className="px-8 py-4 bg-slate-100">
                        <h5>Subtasks</h5>
                     </div>
                     <div className="p-8">
                        {taskInModal.subtasks
                           .filter((subtask) => subtask.completed === false)
                           .map((subtask, index) => (
                              <div className="subtask h-16 items-center flex justify-between border-b mb-4">
                                 <div className="flex items-center">
                                    {subtask.completed ? (
                                       <i class="fas fa-check mr-3"></i>
                                    ) : (
                                       <i class="fas fa-spinner mr-3"></i>
                                    )}
                                    <p>{subtask.title}</p>
                                 </div>

                                 <span key={index} href="#" className="">
                                    <img
                                       className="h-8 w-8 object-cover rounded-full border "
                                       src={subtask.assignee.image}
                                       alt=""
                                    />
                                 </span>
                              </div>
                           ))}
                        <h5>Subtasks Completed</h5>
                        {taskInModal.subtasks
                           .filter((subtask) => subtask.completed === true)
                           .map((subtask, index) => (
                              <div className="subtask h-16 items-center flex justify-between border-b mb-4">
                                 <div className="flex items-center">
                                    {subtask.completed ? (
                                       <i class="fas fa-check mr-3"></i>
                                    ) : (
                                       <i class="fas fa-spinner mr-3"></i>
                                    )}
                                    <p>{subtask.title}</p>
                                 </div>

                                 <span key={index} href="#" className="">
                                    <img
                                       className="h-8 w-8 object-cover rounded-full border "
                                       src={subtask.assignee.image}
                                       alt=""
                                    />
                                 </span>
                              </div>
                           ))}
                     </div>
                  </>
               )}
            </div>
         </div>
  
*/}
      </div>
   );
}

export default TasksPage;

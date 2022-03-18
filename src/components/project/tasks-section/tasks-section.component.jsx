import React from "react";
import "./tasks-section.styles.scss";

import TaskPreview from "../task-preview/task-preview.component";

function TasksSection({ type, tasks, showTaskInModal, children }) {
   return (
      <div className="tasks__section">
         <div className="bg-white border rounded-lg p-2 text-center mb-4">
            <h4>{type}</h4>
         </div>
         {tasks.map((task, index) => (
            <TaskPreview
               showTaskInModal={showTaskInModal}
               key={index}
               {...task}
            />
         ))}
         {children}
      </div>
   );
}

export default TasksSection;

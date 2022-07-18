import React from "react";
import Tag from "../../layouts/tag/tag.component";
import "./task-preview.styles.scss";

function Task({
   id,
   titre,
   description,
   priorite,
   sousTaches,
   showTaskInModal,
}) {
   return (
      <div onClick={() => showTaskInModal(id)} className="task border p-6 mb-4">
         <Tag>{priorite}</Tag>
         <h4 className="my-1">{titre}</h4>
         <p className="mb-4">{description}</p>
         <div className=" flex justify-end">
            <div className="flex">
               {sousTaches.map((item, index) => (
                  <span key={index} href="#" className="">
                     {item.assignee && (
                        <img
                           className="h-8 w-8 rounded-full border "
                           src={item.assignee.image_profile}
                           alt=""
                        />
                     )}
                  </span>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Task;

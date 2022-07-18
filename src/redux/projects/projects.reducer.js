import PROJECTS_DATA from "./projects-data";

//const INITIAL_STATE = PROJECTS_DATA;
const INITIAL_STATE = null;

function getProjectIdByTask(projects, taskId) {
   var searchValue = null;
   projects.forEach((project) => {
      project.taches.forEach((tache) => {
         if (taskId == tache.id) searchValue = project.id;
      });
   });

   return searchValue;
}

const ProjectReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "ADD_PROJECT_DATA":
         return action.payload;
      case "ADD_PROJECT":
         return [...state, action.payload];
      case "ADD_TASK":
         return state.map((project) => {
            if (project.id === action.payload.id_projet) {
               return {
                  ...project,
                  taches: [...project.taches, action.payload],
               };
            } else {
               return project;
            }
         });
      case "ADD_SUBTASK":
         const projectId = getProjectIdByTask(state, action.payload.id_tache);
         console.log(projectId);
         return state.map((project, index) => {
            if (project.id === projectId) {
               return {
                  ...project,
                  taches: state[index].taches.map((tache) => {
                     if (tache.id === action.payload.id_tache) {
                        return {
                           ...tache,
                           sousTaches: [...tache.sousTaches, action.payload],
                        };
                     } else {
                        return tache;
                     }
                  }),
               };
            } else {
               return project;
            }
         });
      default:
         return state;
   }
};

export default ProjectReducer;

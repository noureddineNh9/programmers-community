import PROJECTS_DATA from "./projects-data";

//const INITIAL_STATE = PROJECTS_DATA;
const INITIAL_STATE = null;

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
      default:
         return state;
   }
};

export default ProjectReducer;

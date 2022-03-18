import { combineReducers } from "redux";

import ProjectsReducer from "./projects/projects.reducer";
import UserReducer from "./user/user.reducer";

const rootReducer = combineReducers({
   projects: ProjectsReducer,
   user: UserReducer,
});

export default rootReducer;

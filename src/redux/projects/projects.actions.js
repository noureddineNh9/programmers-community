export const setProjectsData = (projectData) => ({
   type: "ADD_PROJECT_DATA",
   payload: projectData,
});
export const addProject = (project) => ({
   type: "ADD_PROJECT",
   payload: project,
});

export const addTask = (task) => ({
   type: "ADD_TASK",
   payload: task,
});

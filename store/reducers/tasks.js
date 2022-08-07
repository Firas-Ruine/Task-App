import Task from "../../models/Task";
import { DELETE_TASK, CREATE_TASK, FETCH_TASKS } from "../actions/tasks";

//Init the state
const initialState = {
  fetchedTasks: [],
};

export default (state = initialState, action) => {

  //Get Data from the Task Action
  switch (action.type) {

    //Push Taks to the array
    case FETCH_TASKS:
      return {
        fetchedTasks: action.tasks,
      };

    //Create new task and add it to tasks array
    case CREATE_TASK:
      const newTask = new Task(
        action.taskData.id,
        action.taskData.title,
        action.taskData.ownerId
      );
      return {
        ...state,
        fetchedTasks: state.fetchedTasks.concat(newTask),
      };

    //Delete task and remove it from tasks array
    case DELETE_TASK:
      return {
        ...state,
        fetchedTasks: state.fetchedTasks.filter(
          (task) => task.id !== action.id
        ),
      };
  }
  return state;
};

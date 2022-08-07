import Task from "../../models/Task";
import Api from "../../constants/Api";
export const FETCH_TASKS = "FETCH_TASK";
export const CREATE_TASK = "CREATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

//Fetching the tasks from database
export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(Api.api + "/tasks");

      //Handling the errors
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      //Push tasks to array
      const responseData = await response.json();
      const fetchedTasks = [];
      for (const key in responseData) {
        fetchedTasks.push(
          new Task(
            responseData[key].id,
            responseData[key].title,
            responseData[key].user_id
          )
        );
      }

      //Dispatch the fetched Tasks
      dispatch({
        type: FETCH_TASKS,
        tasks: fetchedTasks,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//Create a new task
export const createTask = (title) => {
  return async (dispatch, getState) => {
    //Get the user Token
    const token = getState().auth.token;
    //Get The user id
    const userId = getState().auth.userId;

    const response = await fetch(Api.api + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        //Adding token to json
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title,
        user_id: userId,
      }),
    });

    //Dispatch the response Data
    const responseData = await response.json();
    dispatch({
      type: CREATE_TASK,
      taskData: {
        id: responseData.id,
        title: title,
        ownerId: userId,
      },
    });
  };
};

//Delete Task Function
export const deleteTask = (id) => {
  return async (dispatch, getState) => {
    //Get the user token
    const token = getState().auth.token;

    const response = await fetch(`${Api.api}/task/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        //Adding token to json
        Authorization: "Bearer " + token,
      },
    });

    //Handling the errors
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: DELETE_TASK,
      id: id,
    });
  };
};

export const STATUS = {
  COMPLETED: "Completed!",
  INCOMPLETE: "Incomplete",
};

export const TASK_OBJ = {
  ID: "id",
  TITLE: "title",
  CONTENT: "content",
  CHECKED: "checked",
  CREATED_AT: "created_at",
};

export const TASK_INIT_OBJ = {
  [TASK_OBJ.TITLE]: "",
  [TASK_OBJ.CONTENT]: "",
  [TASK_OBJ.CHECKED]: false,
  [TASK_OBJ.CREATED_AT]: null,
};

export const METHOD = {
  DELETE: "DELETE",
  PUT: "PUT",
  POST: "POST",
};

export const SORT = {
  ASCENDING: "asc",
  DESCENDING: "desc",
};

export const WARNING = {
  DELETE: "Are you sure you want to delete this task?",
  EMPTY: "Please fill out both title and description.",
};

export const LABEL = { inputProps: { "aria-label": "Checkbox demo" } };

export const API_LINK =
  "https://b89c341b-b577-40e3-90b4-1cd555051047.mock.pstmn.io/tasks";

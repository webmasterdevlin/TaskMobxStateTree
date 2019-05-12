import { destroy, flow, types } from "mobx-state-tree";
import { TaskType } from "../models/TaskType";
import { dueDateChecker } from "../utils/dateHelper";
import {
  deleteTask,
  getTaskById,
  getTasks,
  postTask,
  putTask
} from "../services/TaskService";

const TaskModel = types.model("TaskModel", TaskType);
const TaskStore = types
  .model("TaskStore", {
    tasks: types.optional(types.array(TaskModel), []),
    task: types.optional(TaskModel, {}),
    isFetching: false
  })
  .actions(self => ({
    loadTasks: flow(function*() {
      self.isFetching = true;
      try {
        const { data } = yield getTasks();
        self.tasks = data;
      } catch (e) {
        alert(e.message);
      }
      self.isFetching = false;
    }),
    loadTask: flow(function*(id) {
      self.isFetching = true;
      try {
        self.task = (yield getTaskById(id)).data;
      } catch (e) {
        alert(e.message);
      }
    }),

    changeTitle: flow(function*(title) {
      self.task.title = title;
    }),

    changeDueDate: flow(function*(date) {
      self.task.dueDate = date;
    }),

    createTask: flow(function*(newTask) {
      try {
        const { data } = yield postTask(newTask);
        self.tasks.push(data);
      } catch (e) {
        alert(e.message);
      }
    }),

    toggleTask: flow(function*(task) {
      if (!task.id) {
        alert("Ref");
      }
      try {
        task.isDone = !task.isDone;
        yield putTask(task);
        const index = self.tasks.findIndex(t => t.id === task.id);
        self.tasks[index] = task;
      } catch (e) {
        alert(e.message);
      }
    }),

    updateTask: flow(function*(task) {
      task.isReminded = false;
      yield putTask(task);
    }),

    removeTask: flow(function*(task) {
      try {
        yield deleteTask(task);
        destroy(task);
      } catch (e) {
        alert(e.message);
      }
    }),

    checkTasks: async function() {
      await self.tasks.forEach(async t => {
        if (t.isReminded) return;

        dueDateChecker(t);
        t.isReminded = true;
        await putTask(t);
      });
    }
  }))
  .views(self => ({}))
  .create();

export default TaskStore;

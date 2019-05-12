import { types } from "mobx-state-tree";

export const TaskType = {
  id: types.optional(types.number, 0),
  title: types.optional(types.string, ""),
  dueDate: types.optional(types.Date, () => new Date()),
  isDone: false,
  isReminded: false
};

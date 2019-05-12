import { BaseUrl } from "./api-config";
import axios from "axios";

export async function getTasks() {
  return await axios.get(BaseUrl.tasks);
}

export async function getTaskById(id) {
  return await axios.get(`${BaseUrl.tasks}/${id}`);
}

export async function postTask(newTask) {
  return await axios.post(BaseUrl.tasks, newTask);
}

export async function putTask(task) {
  return await axios.put(`${BaseUrl.tasks}/${task.id}`, task);
}

export async function deleteTask(task) {
  return await axios.delete(`${BaseUrl.tasks}/${task.id}`);
}

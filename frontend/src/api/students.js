// frontend/src/api/students.js
import api from "./axios";

/** Student (self) */
export async function getMyStudent() {
  const { data } = await api.get("/students/me");
  return data; // { student, courses?, stats? }
}
export async function updateMyStudent(patch) {
  const { data } = await api.patch("/students/me", patch);
  return data; // { student }
}

/** Admin / Tutor utilities */
export async function listStudents(params = {}) {
  const { page = 1, q = "" } = params;
  const { data } = await api.get("/students", { params: { page, q } });
  return data; // { items, page, total }
}
export async function getStudent(id) {
  const { data } = await api.get(`/students/${id}`);
  return data; // { student }
}
export async function createStudent(payload) {
  const { data } = await api.post("/students", payload);
  return data; // { student }
}
export async function updateStudent(id, patch) {
  const { data } = await api.patch(`/students/${id}`, patch);
  return data; // { student }
}
export async function deleteStudent(id) {
  const { data } = await api.delete(`/students/${id}`);
  return data; // { ok: true }
}

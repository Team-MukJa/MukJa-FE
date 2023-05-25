import { apiInstance } from "./index.js";

const api = apiInstance();
async function login(member, success, fail) {
  await api.post(`/members/login`, JSON.stringify(member)).then(success).catch(fail);
}
async function join(member, success, fail) {
  await api.post(`/members/join`, JSON.stringify(member)).then(success).catch(fail);
}
async function findById(userId, success, fail) {
  api.defaults.headers["Authorization"] = localStorage.getItem("access-token");
  await api.get(`/members/${userId}`).then(success).catch(fail);
}
async function tokenRegeneration(member, success, fail) {
  api.defaults.headers["refresh-token"] = localStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/members/refresh`, member).then(success).catch(fail);
}
async function logout(userId, success, fail) {
  await api.get(`/members/logout/${userId}`).then(success).catch(fail);
}

async function modify(member, success, fail) {
  await api.put(`/members`, JSON.stringify(member)).then(success).catch(fail);
}
async function deleteMember(userId, success, fail) {
  await api.delete(`/members/${userId}`).then(success).catch(fail);
}

export { login, join, findById, tokenRegeneration, logout, modify, deleteMember };

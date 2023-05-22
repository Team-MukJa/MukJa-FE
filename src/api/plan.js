import { apiInstance } from "./index.js";

const api = apiInstance();

function createPlanner(plan, success, fail) {
  api.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("access-token")}`;
  api.post(`/plans`, JSON.stringify(plan)).then(success).catch(fail);
}

function searchByKeyword(keyword, success, fail) {
  api.get(`/plans/search/${keyword}`).then(success).catch(fail);
}
export { createPlanner, searchByKeyword };

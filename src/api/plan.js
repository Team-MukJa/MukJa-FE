import { apiInstance } from "./index.js";

const api = apiInstance();

function createPlanner(plan, success, fail) {
  api.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "access-token"
  )}`;
  api.post(`/plans`, JSON.stringify(plan)).then(success).catch(fail);
}

function searchByKeyword(keyword, success, fail) {
  api.get(`/plans/search/${keyword}`).then(success).catch(fail);
}

function registPlanInfo(planInfos, success, fail) {
  api.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "access-token"
  )}`;
  api
    .post(`/plans/detail`, JSON.stringify(planInfos))
    .then(success)
    .catch(fail);
}

function getPlans(success, fail) {
  api.get(`/plans`).then(success).catch(fail);
}
function getPlanDate(planId, success, fail) {
  api.get(`/plans/detail/date/${planId}`).then(success).catch(fail);
}

function getPlanDetail(planId, success, fail) {
  api.get(`/plans/detail/${planId}`).then(success).catch(fail);
}
export {
  createPlanner,
  searchByKeyword,
  registPlanInfo,
  getPlans,
  getPlanDate,
  getPlanDetail,
};

import { apiInstance } from "../index.js";

const api = apiInstance();

function sidoList(success, fail) {
  api.get(`/tour/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  api.get(`/tour/gugun`, { params: params }).then(success).catch(fail);
}

export { sidoList, gugunList };

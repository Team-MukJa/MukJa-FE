import { apiInstance } from "./index.js";

const api = apiInstance();

function searchDestination(sidoCode, gugunCode, contentTypeId, keyword, success, fail) {
  let apiUrl = `/tour/review/${sidoCode}/${gugunCode}`;

  if (contentTypeId && keyword) {
    apiUrl += `/${contentTypeId}/${keyword}`;
  } else if (contentTypeId) {
    apiUrl += `/${contentTypeId}`;
  } else if (keyword) {
    apiUrl += `/${keyword}`;
  }

  api.get(apiUrl).then(success).catch(fail);
}

export { searchDestination };

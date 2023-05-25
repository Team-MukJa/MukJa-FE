import { apiInstance } from "./index.js";

const api = apiInstance();

function searchDestination(sidoCode, gugunCode, contentTypeId, keyword, success, fail) {
  let apiUrl = `/tour/review/${sidoCode}/${gugunCode}`;

  if (contentTypeId.length === 0) {
    apiUrl += `/${[12, 14, 15, 25, 28, 32, 38, 39]}`;
  } else {
    apiUrl += `/${contentTypeId}`;
  }

  if (!keyword) {
    apiUrl += `/${"null"}`;
  } else {
    apiUrl += `/${keyword}`;
  }
  console.log(apiUrl);

  api.get(apiUrl).then(success).catch(fail);
}

export { searchDestination };

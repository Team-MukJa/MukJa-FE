<template>
    <div>
      <h2>장소 검색</h2>
      <form @submit.prevent="searchPlace">
        <label for="sido">시도:</label>
        <select v-model="sido" id="sido">
          <option value="경기도">경기도</option>
          <option value="서울">서울</option>
          <option value="강원도">강원도</option>
          <option value="경상남도">경상남도</option>
          <option value="전라남도">전라남도</option>
          <option value="전라북도">전라북도</option>
        </select>
        <br>
        <label for="gugun">구군:</label>
        <select v-model="gugun" id="gugun">
          <option value="일산서구">일산서구</option>
          <option value="일산동구">일산동구</option>
        </select>
        <br>
        <label for="keyword">키워드:</label>
        <input v-model="keyword" type="text" id="keyword">
        <br>
        <button type="submit">검색</button>
      </form>
      <div v-if="places.length > 0">
        <h3>검색 결과:</h3>
        <ul>
          <li v-for="place in places" :key="place.id">
            {{ place.place_name }} (위도: {{ place.y }}, 경도: {{ place.x }})
          </li>
        </ul>
        <div id="map" style="width: 100%; height: 400px;"></div>
      </div>
      <div v-else-if="searched">
        <p>해당 장소를 찾을 수 없습니다.</p>
      </div>
    </div>
  </template>


<script>
// import axios from 'axios';

export default {
    data() {
        return {
            sido: '경기도',
            gugun: '일산서구',
            keyword: '',
            places: [],
            searched: false
        };
    },
    // methods: {
    //     searchPlace() {
    //         const apiUrl = 'https://dapi.kakao.com/v2/local/search/keyword.json';
    //         const apiKey = '여기에_당신의_API_키를_입력하세요';

    //         const query = `${this.sido} ${this.gugun} ${this.keyword}`;
    //         const params = { query };
    //         const headers = { Authorization: `KakaoAK ${apiKey}` };

    //         axios.get(apiUrl, { params, headers })
    //             .then(response => {
    //                 const data = response.data;
    //                 if (data.documents && data.documents.length > 0) {
    //                     this.places = data.documents;
    //                     this.searched = true;
    //                     this.displayMarkers();
    //                 } else {
    //                     this.searched = true;
    //                     this.places = [];
    //                 }
    //             })
    //     }
    // }
}
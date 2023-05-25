<template>
  <div>
    <div class="backg"></div>
    <div class="container">
      <div class="page-header">
        <h2 class="page-title text-center">NangMan Diary</h2>
      </div>
      <hr />

      <div class="category-buttons d-flex justify-content-center">
        <b-button class="category-button" variant="outline-primary" :active="selectedCategory === ''"
          @click="selectCategory('')">
          전체
        </b-button>
        <b-button class="category-button" v-for="category in categories" :key="category" variant="outline-primary"
          :active="selectedCategory === category" @click="selectCategory(category)">
          {{ category }}
        </b-button>
        <b-button id="regist-button" class="ml-auto" variant="primary" @click="movePlaceWrite">핫플레이스 작성</b-button>
      </div>
      <hr />

      <div class="row">
        <div class="col-lg-3 col-md-6 mb-4" v-for="place in filteredPlaces" :key="place.placeId">
          <div class="card" @click="showDetail(place)">
            <img :src="require(`@/assets/img/springboot/img/${place.saveFolder}/${place.saveFile}`)" class="card-img-top"
              alt="place Image" />
            <div class="card-body">
              <h5 class="card-title">{{ place.subject }}</h5>
              <p class="card-text">{{ place.placeName }}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">{{ place.registerTime }}</small>
            </div>
          </div>
        </div>
      </div>
      <!--상세보기 모달 Start-->
      <b-modal class="modal-cont" v-model="showModal" title="상세보기" @shown="setSelectedPlace" hide-footer
        header-bg-variant="transparent" size="lg" centered>
        <div class="modal-body" v-if="selectedPlace">
          <div class="mb-3">
            <h5 class="modal-title">
              {{ selectedPlace.subject }}
              <span class="place-name">({{ selectedPlace.placeName }})</span>
              <span class="place-name">({{ selectedPlace.placeAddress }})</span>
            </h5>
            <hr class="my-2" />
          </div>
          <div class="row">
            <div class="col-md-6">
              <!-- 카카오맵 마커 컴포넌트 Start -->
              <div class="map-container">
                <hotplace-detail-map :spotInfo="spotInfo"></hotplace-detail-map>
              </div>
              <!-- 카카오맵 마커 컴포넌트 End -->
            </div>
            <div class="col-md-4">
              <b-card class="content-container" no-body>
                <b-card-text>{{ selectedPlace.content }}</b-card-text>
              </b-card>
              <div class="image-container">
                <img :src="
                  require(`@/assets/img/springboot/img/${selectedPlace.saveFolder}/${selectedPlace.saveFile}`)
                " alt="place Image" class="place-image" />
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer" v-if="selectedPlace">
          <b-button id="del-button" variant="danger" @click="confirmDeletePlace">삭제</b-button>
          <b-button id="end-button" variant="primary" @click="closeModal">닫기</b-button>
        </div>
      </b-modal>
      <!--상세보기 모달 End-->
      <!-- 알림창 모달 Start-->
      <b-modal v-model="confirmModalVisible" title="삭제 확인" hide-footer header-bg-variant="danger">
        <div class="d-flex justify-content-center">
          <p class="text-danger">정말로 삭제하시겠습니까?</p>
        </div>
        <div class="text-center mt-4">
          <b-button variant="danger" @click="deletePlace">확인</b-button>
          <b-button variant="secondary" @click="closeConfirmModal">취소</b-button>
        </div>
      </b-modal>
      <!-- 알림창 모달 End-->
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import HotplaceDetailMap from "./item/HotplaceDetailMap.vue";

export default {
  data() {
    return {
      places: [],
      showModal: false,
      selectedPlace: null,
      confirmModalVisible: false, // 알림창 모달 표시 여부
      categories: ["낭만", "힐링", "여유"], // 카테고리 배열 추가
      selectedCategory: "", // 선택된 카테고리 변수 추가
      spotInfo: {
        x: null,
        y: null,
      },
    };
  },
  components: {
    HotplaceDetailMap,
  },
  created() {
    http.get("/places").then(({ data }) => {
      console.log(data);
      this.places = data;
    });
  },
  computed: {
    filteredPlaces() {
      if (this.selectedCategory) {
        return this.places.filter((place) => place.category === this.selectedCategory);
      }
      return this.places;
    },
  },
  methods: {
    setSelectedPlace() {
      this.selectedPlace = { ...this.selectedPlace };
    },
    showDetail(place) {
      this.selectedPlace = place;
      this.spotInfo.x = this.selectedPlace.placeX;
      this.spotInfo.y = this.selectedPlace.placeY;
      console.log("상세보기");
      console.log(this.selectedPlace);

      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    deletePlace() {
      http.delete(`/places/${this.selectedPlace.placeId}`).then(({ data }) => {
        console.log(data);
      });
      this.confirmModalVisible = false;
      this.$router.go(0);
    },
    confirmDeletePlace() {
      this.confirmModalVisible = true;
    },
    closeConfirmModal() {
      this.confirmModalVisible = false;
    },
    movePlaceWrite() {
      this.$router.push({ name: "placewrite" });
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
  },
};
</script>

<style scoped>
.backg {
  z-index: -1;
  background-image: url('../../assets/paper.png');
  background-size: 1500px 850px;
  background-position: center;
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}

.container {
  overflow-y: auto;
  width: 1000px;
  height: 700px;
  margin-top: 50px;
  overflow-y: auto;
}

.container::-webkit-scrollbar {
  width: 5px;
}

.container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  text-align: center;
  margin: 30px;
}

.page-title {
  margin-top: 10px;
  font-family: 'MYYeongnamnu',
    sans-serif;
  font-size: 40px;
  color: rgb(253, 131, 131);
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

#regist-button,
#del-button,
#end-button {
  background-color: rgb(253, 186, 186);
  border-color: transparent;
  color: black;
}

#regist-button:hover,
#regist-button:focus,
#regist-button:active,
#del-button:hover,
#del-button:focus,
#del-button:active,
#end-button:hover,
#end-button:focus,
#end-button:active {
  background-color: rgb(255, 165, 165);
}

.category-button {
  font-family: 'MYYeongnamnu',
    sans-serif;
  font-size: 20px;
  border-color: transparent;
  color: black;
  margin-right: 20px;
  border-radius: 20px;
}

.category-button:hover,
.category-button:focus {
  background-color: rgb(253, 186, 186);
}

.card {
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  background-color: #f8f9fa;
}

.card:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #444;
  font-weight: bold;
}

.card-text {
  color: #555;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.card-footer {
  border-top: 1px solid #dee2e6;
  padding: 0.5rem;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  justify-content: space-between;
}

.modal-footer button {
  margin-right: 10px;
}

.image-container {
  max-width: 100%;
  max-height: 200px;
  overflow-y: auto;
}

.image-container::-webkit-scrollbar {
  width: 5px;
}

.image-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}

.place-image {
  /* max-width: 100%;
  height: auto;
  border-radius: 8px; */
  width: auto;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  padding: 1rem;
}

.modal-body .row {
  align-items: flex-start;
}

.place-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.content-container {
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.modal-cont {
  max-width: 100vw;
  max-height: 40vh;
}

.place-name {
  font-size: 0.8rem;
  color: #888;
  margin-left: 0.5rem;
  display: inline-block;
  margin-bottom: 0.2rem;
}

.modal-content {
  height: 100%;
  overflow-y: auto;
}

.place-name {
  font-size: 1rem;
  color: #888;
  margin-left: 0.5rem;
  display: inline-block;
  align-self: flex-end;
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
}

.map-container {
  height: 300px;
  margin-bottom: 1rem;
}

.modal-body .row {
  display: flex;
  flex-wrap: nowrap;
}

.modal-body .col-md-6 {
  flex: 0 0 50%;
  padding: 0.5rem;
}

.modal-body .col-md-4 {
  flex: 0 0 50%;
  padding: 0.5rem;
  margin-left: 50px;
}
</style>

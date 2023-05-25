<template>
  <div class="container">
    <h1>핫플레이스 목록</h1>
    <div class="category-buttons d-flex">
      <b-button
        variant="dark"
        :active="selectedCategory === ''"
        @click="selectCategory('')"
      >
        전체
      </b-button>
      <b-button
        v-for="category in categories"
        :key="category"
        variant="dark"
        :active="selectedCategory === category"
        @click="selectCategory(category)"
      >
        {{ category }}
      </b-button>

      <div class="ml-auto">
    <b-button variant="dark" @click="movePlaceWrite">핫플레이스 작성</b-button>
  </div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-6 mb-4" v-for="place in filteredPlaces" :key="place.placeId">
        <div class="card" @click="showDetail(place)">
          <img
            :src="require(`@/assets/img/springboot/img/${place.saveFolder}/${place.saveFile}`)"
            class="card-img-top"
            alt="place Image"
          />
          <div class="card-body">
            <h5 class="card-title">{{ place.subject }}</h5>
            <p class="card-text">{{ place.content }}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{ place.date }}</small>
          </div>
        </div>
      </div>
    </div>

    <!--상세보기 모달 Start-->
    <b-modal
      v-model="showModal"
      class="modal-view"
      title="뭐묵자"
      @shown="setSelectedPlace"
      hide-footer
      header-bg-variant="transparent"
      size="xl"
      centered
    >
      <div class="modal-body" v-if="selectedPlace">
        <div class="mb-3">
          <h5 class="modal-title">
            {{ selectedPlace.subject }}
            <span class="place-name place-right">({{ selectedPlace.placeAddress }})</span>
            <span class="place-name place-right">({{ selectedPlace.placeName }})</span>
          </h5>
          <hr class="my-2" />
        </div>
        <div class="row">
          <div class="col-md-5 " v-if="selectedPlace">
            <!-- 카카오맵 마커 컴포넌트 Start -->
            <div class="map-container">
              <hotplace-detail-map :spotInfo="spotInfo"></hotplace-detail-map>
            </div>
            <!-- 카카오맵 마커 컴포넌트 End -->
          </div>
          
          <div class="col-md-7">
            <div class="content-container">
    <div class="content-text">{{ selectedPlace.content }}</div>
  </div>
            <div class="image-container">
              <img
                :src="
                  require(`@/assets/img/springboot/img/${selectedPlace.saveFolder}/${selectedPlace.saveFile}`)
                "
                alt="place Image"
                class="place-image"
                style="max-width: 100%; max-height: 100%;"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer" v-if="selectedPlace">
        <b-button variant="danger" @click="confirmDeletePlace">삭제</b-button>
        <b-button variant="primary" @click="closeModal">닫기</b-button>
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
      categories: ["음식", "여행", "문화"], // 카테고리 배열 추가
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
      this.$router.go(0);

    },

    deletePlace() {
      // 게시물 삭제 로직 작성
      http.delete(`/places/${this.selectedPlace.placeId}`).then(({ data }) => {
        console.log(data);
      });
      // 알림창 모달 닫기
      this.confirmModalVisible = false;
      this.$router.go(0);
    },
    confirmDeletePlace() {
      // 알림창 모달 표시
      this.confirmModalVisible = true;
    },
    closeConfirmModal() {
      // 알림창 모달 닫기
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
  /* text-align: center; */
  height: 600px;
  margin-bottom: 1rem;
}

.place-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.modal-body {
  padding: 1rem;
}

.modal-body .row {
  align-items: flex-start;
}

/* ... 기존 스타일 ... */
.place-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.content-container {
  padding: 0.5rem;
  height: 100px;
}

.modal-dialog {
  max-width: 80vw;
  max-height: 80vh;
}

.place-name {
  font-size: 0.8rem;
  color: #888;
  margin-left: 0.5rem;
  display: inline-block;
  margin-bottom: 0.2rem;
}

/* .modal-content {
  height: 100%;
  overflow-y: auto;
} */

.place-name {
  font-size: 1rem;
  color: #888;
  margin-left: 0.5rem;
  display: inline-block;
  align-self: flex-end;
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
}

.modal-view {
  max-width: 100vw;
  max-height: 40vh;
}
.container{
  overflow-y: auto;
  width: 1000px;
  height: 1000px;
  margin-top: 50px;
  overflow-y: auto;
  text-align: center;
}
.category-buttons{
  margin-bottom: 30px;
}
.map-container{
  width: 400px;
  height: 700px;
  margin: 1rem;
}
.place-right {
  float: right;
}
</style>

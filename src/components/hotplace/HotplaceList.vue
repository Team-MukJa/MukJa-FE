<template>
  <div class="container">
    <h1>핫플레이스 목록</h1>
    <div class="row">
      <div class="col-lg-3 col-md-6 mb-4" v-for="place in places" :key="place.placeId">
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
    <div class="text-center mt-4">
      <b-button variant="primary" @click="movePlaceWrite">핫플레이스 작성</b-button>
    </div>
    <!--상세보기 모달 Start-->
    <b-modal
      v-model="showModal"
      title="상세보기"
      @shown="setSelectedPlace"
      hide-footer
      header-bg-variant="transparent"
      size="xl"
    >
      <div class="modal-body flex-grow-1" v-if="selectedPlace">
        <div class="mb-3">
          <h5 class="modal-title">{{ selectedPlace.subject }}</h5>
          <hr class="my-2" />
        </div>
        <div class="d-flex">
          <div class="mr-4">
            <img
              :src="
                require(`@/assets/img/springboot/img/${selectedPlace.saveFolder}/${selectedPlace.saveFile}`)
              "
              alt="place Image"
              class="place-image"
            />
          </div>
          <div class="flex-grow-1">
            <div class="content-container">
              <p class="mb-0">{{ selectedPlace.content }}</p>
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

export default {
  data() {
    return {
      places: [],
      showModal: false,
      selectedPlace: null,
      confirmModalVisible: false, // 알림창 모달 표시 여부
    };
  },
  created() {
    http.get("/places").then(({ data }) => {
      console.log(data);
      this.places = data;
    });
  },

  methods: {
    setSelectedPlace() {
      this.selectedPlace = { ...this.selectedPlace };
    },
    showDetail(place) {
      this.selectedPlace = place;
      console.log("상세보기");
      console.log(this.selectedPlace);

      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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
  },
};
</script>

<style>
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
  text-align: center;
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
  align-items: center;
}

.content-container {
  /* height: 500px !important;  */
  /* 적절한 높이로 조정해주세요 */
  width: 300px !important;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 생성 */
}
</style>

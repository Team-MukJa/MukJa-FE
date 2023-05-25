<template>
  <div class="writehotplace">
    <div class="page-header">
      <h2 class="page-title text-center">낭만 일지 기록하기</h2>
    </div>
    <hr class="custom-hr" />
    <b-form v-on:submit.prevent class="regist-place">
      <b-form-group label="제목" label-for="title-input">
        <b-form-input
          id="title-input"
          v-model="article.subject"
          @input="checkFormValidity"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="카테고리" label-for="category-buttons">
        <div id="category-buttons" class="d-flex justify-content-center">
          <b-button
            class="category-button"
            v-for="category in categories"
            :key="category"
            v-model="article.selectedCategory"
            :variant="isSelected(category) ? 'primary' : 'outline-primary'"
            @click="selectCategory(category)"
          >
            {{ category }}
          </b-button>
        </div>
      </b-form-group>

      <b-form-group id="date-group" label="날짜" label-for="date-input">
        <b-form-datepicker
          id="date-input"
          v-model="article.tripday"
          :day-names="[]"
          @input="checkFormValidity"
        ></b-form-datepicker>
      </b-form-group>

      <div v-if="!receivedMapValue" class="mb-3">
        <b-card style="height: 120px">
          <div class="text-center py-2">
            <b-badge variant="secondary" class="badge-size"
              >방문했던 곳을 지도에서 선택해주세요</b-badge
            >
          </div>
        </b-card>
      </div>

      <div v-else class="mb-3">
        <b-card>
          <div class="custom-field">
            <b-form-group label="장소명" label-cols-sm="3">
              <p class="map-data">{{ receivedMapValue.place_name }}</p>
            </b-form-group>
          </div>

          <div class="custom-field">
            <b-form-group label="주소" label-cols-sm="3">
              <p class="map-data">{{ receivedMapValue.address_name }}</p>
            </b-form-group>
          </div>

          <div class="custom-field">
            <b-form-group label="카테고리" label-cols-sm="3">
              <p class="map-data">{{ receivedMapValue.category_group_name }}</p>
            </b-form-group>
          </div>
        </b-card>
      </div>

      <b-form-group label="내용" label-for="content-input">
        <b-form-textarea
          id="content-input"
          v-model="article.content"
          rows="5"
          @input="checkFormValidity"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="파일 업로드" label-for="file-input">
        <b-form-file
          id="file-input"
          v-model="article.file"
          accept=".jpg,.png"
          size=""
          @input="checkFileSize"
        ></b-form-file>
      </b-form-group>

      <div class="text-center button-container">
        <b-button
          class="regist-button"
          type="submit"
          variant="primary"
          @click="writePlace"
          :disabled="!isFormValid"
          >작 성</b-button
        >
        <b-button class="regist-button" type="submit" @click="moveList"
          >목 록</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import http from "@/util/http-common";
import { mapState, mapGetters } from "vuex";
const memberStore = "memberStore";

export default {
  components: {},
  props: {
    receivedMapValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      article: {
        subject: "",
        tripday: null,
        content: "",
        file: null,
        selectedCategory: null,
      },
      isFormValid: false,
      categories: ["낭만", "힐링", "여유"],
    };
  },
  watch: {
    receivedMapValue: {
      handler() {
        this.checkFormValidity();
      },
      deep: true,
    },
  },
  created() {
    if (this.userInfo) {
      this.article.userId = this.userInfo.userId;
    }
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    checkFormValidity() {
      const { subject, tripday, content, file } = this.article;
      this.isFormValid =
        subject && tripday && content && file && this.receivedMapValue;
    },
    checkFileSize() {
      const file = this.article.file;
      const maxSize = 3 * 1024 * 1024; // 3MB 제한 (원하는 용량으로 변경 가능)

      if (file && file.size > maxSize) {
        alert("파일 크기는 최대 3MB를 초과할 수 없습니다.");
        this.article.file = "";
      }
      this.checkFormValidity();
    },
    selectCategory(category) {
      this.article.selectedCategory = category;
    },
    isSelected(category) {
      return this.article.selectedCategory === category;
    },
    async writePlace() {
      // 게시판 작성 로직 구현
      try {
        if (!this.article.selectedCategory) {
          alert("카테고리를 선택해주세요.");
          return;
        }

        const formData = new FormData();
        let uID = this.userInfo.userId;
        formData.append("userId", uID);
        formData.append("subject", this.article.subject);
        formData.append("tripDay", this.article.tripday);
        formData.append("content", this.article.content);
        formData.append("file", this.article.file);
        formData.append("category", this.article.selectedCategory);

        // map 에서 받아온 데이터
        formData.append("placeAddress", this.receivedMapValue.address_name);
        formData.append("placeName", this.receivedMapValue.place_name);
        formData.append("placeX", this.receivedMapValue.x);
        formData.append("placeY", this.receivedMapValue.y);

        const response = await http.post(`/places`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        alert("기록을 완료하였습니다.");

        this.$router.push({ name: "placelist" });
      } catch (error) {
        console.error(error);
        alert("기록 중 에러가 발생하였습니다.");
      }
    },
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "placelist" });
    },
  },
};
</script>

<style scoped>
.writehotplace {
  margin: 0 auto;
  height: 75vh;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  text-align: center;
}

.page-title {
  font-family: "MYYeongnamnu", sans-serif;
  font-size: 40px;
}

.category-button {
  border-color: black;
  color: black;
  margin-right: 20px;
}

.category-button:hover,
.category-button:focus,
.category-button:active {
  background-color: rgb(253, 186, 186);
}

.regist-place {
  height: 65vh;
  overflow-y: auto;
}

.regist-place::-webkit-scrollbar {
  width: 5px;
}

.regist-place::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}

.text-center {
  text-align: center;
  margin-top: 20px;
}

.button-container {
  margin-top: 20px;
}

.button-container > *:not(:last-child) {
  margin-right: 10px;
}

.regist-button {
  background-color: rgb(253, 186, 186);
  border-color: transparent;
  color: black;
}

.regist-button:hover,
.regist-button:focus {
  background-color: rgb(255, 165, 165);
}

.custom-field {
  margin-bottom: 8px;
  background-color: #f8f8f8;
  padding: 10px;
  height: 50px;
}

.custom-field p {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
  color: #333333;
}

.card-body {
  height: 200px;
}

.map-data {
  font-size: 12px;
}

.badge-size {
  font-size: 12px;
  padding: 4px 8px;
}

.custom-hr {
  border-top: 2px solid rgb(255, 165, 165);
}
</style>

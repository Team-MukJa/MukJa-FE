<template>
  <div class="writehotplace">
    <h1>핫플레이스 작성</h1>
    <!-- 나머지 게시판 작성 화면 코드 -->
    <!-- <b-form @submit="submitForm"> -->
    <b-form v-on:submit.prevent>
      <b-form-group label="제목" label-for="title-input">
        <b-form-input
          id="title-input"
          v-model="article.subject"
          @input="checkFormValidity"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="카테고리" label-for="category-buttons">
        <div id="category-buttons" class="d-flex">
          <b-button
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

      <!--Map 에서 받아오는 데이터-->
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
          rows="8"
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

      <b-button type="submit" variant="primary" @click="writePlace" :disabled="!isFormValid"
        >작 성</b-button
      >

      <b-button type="submit" @click="moveList">목 록</b-button>
    </b-form>
  </div>
</template>

<script>
import http from "@/util/http-common";

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
      categories: ["음식", "여행", "문화"],
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
  methods: {
    checkFormValidity() {
      const { subject, tripday, content, file } = this.article;
      this.isFormValid = subject && tripday && content && file && this.receivedMapValue;
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
        let uID = "ssafy";
        formData.append("userId", uID);
        formData.append("subject", this.article.subject);
        formData.append("tripDay", this.article.tripday);
        formData.append("content", this.article.content);
        formData.append("file", this.article.file);
        formData.append("category", this.article.selectedCategory);

        // map 에서 받아온 데이터
        formData.append("placeAddress", this.receivedMapValue.address_name);
        formData.append("category", this.receivedMapValue.category_group_name);
        formData.append("placeName", this.receivedMapValue.place_name);
        formData.append("placeX", this.receivedMapValue.x);
        formData.append("placeY", this.receivedMapValue.y);

        console.log(formData);
        alert("작성");
        // 여기에서 formData를 서버로 전송하는 작업을 수행할 수 있습니다.
        // axios 등을 사용하여 서버와 통신하는 코드를 작성할 수 있습니다.
        const response = await http.post(`/places`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);

        this.$router.push({ name: "placelist" });
      } catch (error) {
        console.error(error);
        alert("에러발생");
      }

      // 폼 데이터 전송 후 화면 초기화
      // this.article.subject = "";
      // this.article.content = "";
      // this.article.file = null;
      // this.article.tripDay = null;
    },
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "placelist" });
    },
  },
};
</script>

<style>
.writehotplace {
  margin: 0 auto;
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
</style>

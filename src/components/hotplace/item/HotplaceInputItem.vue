<template>
  <div>
    <h1>핫플레이스 작성</h1>
    <!-- 나머지 게시판 작성 화면 코드 -->
    <!-- <b-form @submit="submitForm"> -->
    <b-form v-on:submit.prevent>
      <b-form-group label="제목" label-for="title-input">
        <b-form-input id="title-input" v-model="article.subject" required></b-form-input>
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
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group label="내용" label-for="content-input">
        <b-form-textarea
          id="content-input"
          v-model="article.content"
          rows="13"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="파일 업로드" label-for="file-input">
        <b-form-file
          id="file-input"
          v-model="article.file"
          accept=".jpg,.png"
          size=""
        ></b-form-file>
      </b-form-group>

      <b-button type="submit" variant="primary" @click="writePlace">작 성</b-button>

      <b-button type="submit" @click="moveList">목 록</b-button>
    </b-form>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  components: {},
  data() {
    return {
      article: {
        subject: "",
        tripday: null,
        content: "",
        file: null,
        selectedCategory: null,
      },
      categories: ['음식', '여행', '문화'],
    };
  },
  methods: {
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

        alert("작성");
        // 여기에서 formData를 서버로 전송하는 작업을 수행할 수 있습니다.
        // axios 등을 사용하여 서버와 통신하는 코드를 작성할 수 있습니다.
        const response = await http.post(`/places`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);

        // 폼 데이터 전송 후 화면 초기화
        this.subject = "";
        this.content = "";
        this.file = null;
        this.tripDay = null;
        this.article.selectedCategory = null;

        this.$router.push({ name: "placelist" });
      } catch (error) {
        console.error(error);
      }


    },
    // writePlace() {},
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "placelist" });
    },
  },
};
</script>

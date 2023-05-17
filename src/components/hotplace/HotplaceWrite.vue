<template>
  <div class="container d-flex justify-content-center">
    <div class="col-md-8 rounded p-3" style="height: 800px">
      <MapComponent></MapComponent>
    </div>
    <div class="col-md-8 rounded p-3" style="background-color: whitesmoke; margin: 8px">
      <h1>핫플레이스 작성</h1>
      <!-- 나머지 게시판 작성 화면 코드 -->
      <b-form @submit="submitForm">
        <b-form-group label="제목" label-for="title-input">
          <b-form-input id="title-input" v-model="title" required></b-form-input>
        </b-form-group>

        <b-form-group label="내용" label-for="content-input">
          <b-form-textarea
            id="content-input"
            v-model="content"
            rows="13"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label="파일 업로드" label-for="file-input">
          <b-form-file id="file-input" v-model="file" accept=".pdf,.jpg,.png"></b-form-file>
        </b-form-group>

        <b-button type="submit" variant="primary">작 성</b-button>

        <b-button type="submit" @click="moveList">목 록</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import MapComponent from "./MapComponent.vue";

export default {
  components: {
    MapComponent,
  },
  data() {
    return {
      title: "",
      content: "",
      file: null,
    };
  },
  methods: {
    submitForm() {
      // 게시판 작성 로직 구현
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("file", this.file);

      // 여기에서 formData를 서버로 전송하는 작업을 수행할 수 있습니다.
      // axios 등을 사용하여 서버와 통신하는 코드를 작성할 수 있습니다.

      // 폼 데이터 전송 후 화면 초기화
      this.title = "";
      this.content = "";
      this.file = null;
    },
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "placelist" });
    },
  },
};
</script>

<style>
.container {
  display: flex;
}
</style>

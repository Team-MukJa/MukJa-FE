<template>
  <div>
    <div class="backg"></div>
    <div class="container">
      <div class="page-header">
        <h2 class="page-title text-center">{{ article.subject }}</h2>
      </div>
      <hr />
      <div class="button-group d-flex">
        <div class="list">
          <b-button class="bt-button" variant="secondary" @click="moveList"
            >목록</b-button
          >
        </div>
        <div class="rest">
          <b-button
            class="bt-button"
            variant="primary"
            @click="moveModifyArticle"
            >수정</b-button
          >
          <b-button class="bt-button" variant="danger" @click="deleteArticle"
            >삭제</b-button
          >
        </div>
      </div>
      <hr />
      <div class="col-lg-8">
        <div class="content" v-html="article.content"></div>
      </div>
      <hr />
      <div class="text-muted">
        작성자: {{ article.noticeId }} | 작성일: {{ article.registerTime }} |
        조회수:
        {{ article.hit }}
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "NoticeView",
  data() {
    return {
      noticeid: Number,
      article: Object,
    };
  },
  created() {
    this.noticeid = this.$route.params.noticeid;
    console.log(this.noticeid);
    http.get(`/notices/${this.noticeid}`).then(({ data }) => {
      this.article = data;
    });
  },
  methods: {
    moveModifyArticle() {
      console.log("글수정 하러가자!!!");
      this.$router.push({
        name: "noticemodify",
        params: { noticeid: this.article.noticeId },
      });
    },
    deleteArticle() {
      console.log("글삭제 하러가자!!!");
      this.$router.push({
        name: "noticedelete",
        params: { noticeid: this.article.noticeId },
      });
    },
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "noticelist" });
    },
  },
};
</script>

<style scoped>
.backg {
  z-index: -1;
  background-image: url("../../assets/paper.png");
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
  font-family: "MYYeongnamnu", sans-serif;
  font-size: 40px;
  color: rgb(253, 131, 131);
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
.bt-button {
  font-size: 15px;
  border-color: transparent;
  color: black;
  margin: 0px 10px;
  background-color: rgb(253, 186, 186);
}

.bt-button:hover,
.bt-button:focus {
  background-color: rgb(255, 165, 165);
}
.text-muted {
  font-size: 14px;
  color: #999999;
  margin-left: 10px;
}

.content {
  margin-top: 30px;
  line-height: 1.6;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.list {
  justify-content: flex-start;
}

.rest {
  justify-content: flex-end;
}
</style>

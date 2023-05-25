<template>
  <div class="cont">
    <div class="content">
      <div class="card-container">
        <div class="notice-card">
          <div class="notice-header">
            <h2 class="notice-title">{{ article.subject }}</h2>
            <div class="notice-meta">
              <span class="meta-item">작성자: {{ article.userId }}</span>
              <span class="meta-item">작성일: {{ article.registerTime }}</span>
              <span class="meta-item">조회수: {{ article.hit }}</span>
            </div>
          </div>
          <div class="notice-content" v-html="article.content"></div>
          <div class="button-group">
            <b-button variant="dark" class="back-button" @click="moveList">목록으로</b-button>
            <b-button variant="dark" class="mr-2" @click="moveModifyArticle">수정</b-button>
            <b-button variant="dark" @click="deleteArticle">삭제</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cont {
  margin: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 120vh;
}

.content {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
}

.card-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.notice-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.notice-header {
  border-bottom: 2px solid #eeeeee;
  padding-bottom: 30px;
  margin-bottom: 30px;
}

.notice-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.notice-meta {
  font-size: 18px;
  color: #999999;
}

.meta-item {
  margin-right: 20px;
}

.notice-content {
  margin-bottom: 30px;
  line-height: 1.8;
  font-size: 18px;
}

.button-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.b-button {
  font-size: 18px;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.b-button-dark {
  background-color: #333333;
  border-color: #333333;
  color: #ffffff;
}

.b-button-dark:hover {
  background-color: #222222;
  border-color: #222222;
}

.back-button {
  margin-top: 0;
  margin-right: auto;
}
</style>

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
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    this.noticeid = this.$route.params.noticeid;
    console.log(this.noticeid);
    http.get(`/notices/${this.noticeid}`).then(({ data }) => {
      this.article = data;
    });
  },
  methods: {
    moveModifyArticle() {
      console.log("글수정 하러가자!!!");
      this.$router.push({ name: "noticemodify", params: { noticeid: this.article.noticeId } });
    },
    deleteArticle() {
      console.log("글삭제 하러가자!!!");
      this.$router.push({ name: "noticedelete", params: { noticeid: this.article.noticeId } });
    },
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "noticelist" });
    },
  },
};
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <b-card class="detail-card">
          <h2 class="mb-4">공지사항 상세보기</h2>
          <h2 class="mb-4">{{ article.subject }}</h2>
          <hr />
          <div class="text-muted mb-4">
            작성자: {{ article.noticeId }} | 작성일: {{ article.registerTime }} | 조회수:
            {{ article.hit }}
          </div>
          <div class="content" v-html="article.content"></div>
          <div class="button-group">
            <b-button variant="primary" class="mr-2" @click="moveModifyArticle">수정</b-button>
            <b-button variant="danger" @click="deleteArticle">삭제</b-button>
          </div>
          <b-button variant="secondary" class="mt-4" @click="moveList">목록</b-button>
        </b-card>
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

<style scoped>
.detail-card {
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
  width: 700px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.text-muted {
  font-size: 14px;
  color: #999999;
}

.content {
  margin-top: 30px;
  line-height: 1.6;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.b-btn {
  font-size: 14px;
  font-weight: bold;
}

.b-btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.b-btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.b-btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.b-btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
}

.b-btn-secondary:focus,
.b-btn-secondary.focus {
  background-color: #5a6268;
  border-color: #5a6268;
}
</style>

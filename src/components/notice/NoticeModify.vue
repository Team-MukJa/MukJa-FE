<template>
  <div>
    <div class="backg"></div>
    <div class="container">
      <div class="page-header">
        <h2 class="page-title text-center">수정</h2>
      </div>
      <hr />
      <div class="button-group d-flex">
        <div class="list">
          <b-button class="bt-button" variant="secondary" @click="moveList"
            >목록</b-button
          >
        </div>
        <div class="rest">
          <b-button class="bt-button" variant="primary" @click="checkValue"
            >수정</b-button
          >
        </div>
      </div>
      <hr />
      <b-form-group label="제목">
        <b-form-input v-model="article.subject"></b-form-input>
      </b-form-group>
      <b-form-group label="작성자">
        <b-form-input v-model="article.userId"></b-form-input>
      </b-form-group>
      <b-form-group label="내용">
        <b-form-textarea v-model="article.content" rows="10"></b-form-textarea>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "NoticeModify",
  data() {
    return {
      articleno: Number,
      article: Object,
    };
  },
  methods: {
    checkValue() {
      let err = true;
      let msg = "";
      !this.article.userId &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else this.modifyArticle();
    },
    modifyArticle() {
      console.log(this.article.noticeId + "번 글수정 하러가자!!!!");
      http.put(`/notices/${this.articleno}`, this.article).then(({ data }) => {
        console.log(data);
        this.moveList();
      });
    },
    moveList() {
      console.log("목록으로 이동합니다.");
      this.$router.push({ name: "noticelist" });
    },
  },
  created() {
    this.articleno = this.$route.params.noticeid;

    http.get(`/notices/${this.articleno}`).then(({ data }) => {
      this.article = data;
    });
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
  font-size: 40px;
}
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.bt-button {
  font-size: 15px;
  border-color: transparent;
  color: black;
  margin: 0px 20px;
  background-color: rgb(253, 186, 186);
}

.bt-button:hover,
.bt-button:focus {
  background-color: rgb(255, 165, 165);
}
</style>

<template>
  <div class="cont">
    <div class="content">
      <div class="card-containe">
        <b-card class="edit-card">
          <h2 class="mb-4 center">수정</h2>
          <hr />
          <b-form-group label="제목">
            <b-form-input class="custom-input" v-model="article.subject"></b-form-input>
          </b-form-group>
          <b-form-group label="작성자">
            <b-form-input class="custom-input" v-model="article.userId"></b-form-input>
          </b-form-group>
          <b-form-group label="내용">
            <b-form-textarea
              class="custom-input"
              v-model="article.content"
              rows="10"
            ></b-form-textarea>
          </b-form-group>
          <div class="button-group">
            <b-button variant="dark" class="mr-2" @click="checkValue">수정</b-button>
            <b-button variant="dark" @click="moveList">목록</b-button>
          </div>
        </b-card>
      </div>
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
    // 입력값 체크하기 - 체크가 성공하면 modifyArticle 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      !this.article.userId &&
        ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 modifyArticle 호출
      else this.modifyArticle();
    },
    modifyArticle() {
      console.log(this.article.noticeId + "번 글수정 하러가자!!!!");
      // 비동기
      // TODO : 글번호에 해당하는 글정보 수정.
      http.put(`/notices/${this.articleno}`, this.article).then(({ data }) => {
        // let msg = "글수정 시 문제 발생!!!";
        // if (data === "success") {
        //   msg = "글수정 성공!!!";
        // }
        // alert(msg);
        console.log(data);
        this.moveList();
      });
    },

    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "noticelist" });
    },
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    this.articleno = this.$route.params.noticeid;

    http.get(`/notices/${this.articleno}`).then(({ data }) => {
      this.article = data;
    });
  },
};
</script>

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

.custom-input:focus {
  outline: none;
  border-color: gray;
  box-shadow: 0 0 5px gray;
}
.edit-card {
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
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

.b-button {
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.b-button-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #ffffff;
}

.b-button-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.b-button-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #ffffff;
}

.b-button-secondary:hover {
  background-color: #555e64;
  border-color: #555e64;
}

.b-form-group {
  margin-bottom: 20px;
}
</style>

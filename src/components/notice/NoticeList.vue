<template>
  <div>
    <div class="backg"></div>
    <div class="container">
      <div class="page-header">
        <h2 class="page-title text-center">NangMan Comunity</h2>
      </div>
      <hr />
      <div class="table-container">
        <b-table
          class="table"
          striped
          hover
          :items="articles"
          :fields="fields"
          @row-clicked="viewPost"
          responsive
        >
          <template #cell(id)="row">
            {{ row.value }}
          </template>
        </b-table>
      </div>
      <div class="button-container">
        <!-- <b-button class="create-button" variant="primary" @click="goWriteNotice">글 작성</b-button> -->
        <b-button variant="primary" @click="openModal" class="regist-button"
          >글 작성</b-button
        >
        <b-modal
          v-model="showModal"
          title="글 작성"
          @hide="resetForm"
          class="write-modal"
          hide-footer
        >
          <b-form-group label="제목">
            <b-form-input v-model="article.subject"></b-form-input>
          </b-form-group>
          <b-form-group label="작성자">
            <b-form-input v-model="article.userId" readonly></b-form-input>
          </b-form-group>
          <b-form-group label="내용">
            <b-form-textarea
              v-model="article.content"
              rows="10"
            ></b-form-textarea>
          </b-form-group>
          <div class="button-group">
            <b-button
              id="reg-button"
              variant="primary"
              class="mr-2"
              @click="registArticle"
              >작성</b-button
            >
            <b-button id="end-button" variant="secondary" @click="hideModal"
              >취소</b-button
            >
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import { mapState, mapGetters } from "vuex";
const memberStore = "memberStore";

export default {
  name: "NoticeList",
  components: {},
  data() {
    return {
      fields: [
        { key: "noticeId", label: "번호", sortable: true },
        { key: "subject", label: "제목", sortable: true },
        { key: "userId", label: "작성자", sortable: true },
        { key: "hit", label: "조회수", sortable: true },
        { key: "registerTime", label: "작성 시간", sortable: true },
      ],
      articles: [],
      showModal: false,
      article: {
        subject: null,
        userId: null,
        content: null,
      },
    };
  },
  created() {
    http.get("/notices").then(({ data }) => {
      console.log(data);
      this.articles = data;
    });
    if (this.userInfo) {
      this.article.userId = this.userInfo.userId;
    }
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    viewPost(item) {
      const noticeId = item.noticeId;
      this.$router.push({ name: "noticeview", params: { noticeid: noticeId } });
    },
    openModal() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    resetForm() {
      this.article = {
        subject: "",
        userId: "",
        content: "",
      };
    },
    registArticle() {
      const param = {
        userId: this.article.userId,
        subject: this.article.subject,
        content: this.article.content,
      };

      console.log(param);
      alert("글 작성을 완료하였습니다.");
      http.post(`/notices`, param).then(({ data }) => {
        console.log(data);
        this.hideModal();
        this.$router.go(0); // 새로고침
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
.regist-button,
#reg-button,
#end-button {
  background-color: rgb(253, 186, 186);
  border-color: transparent;
  color: black;
}

.regist-button:hover,
.regist-button:focus,
.regist-button:active,
#reg-button:hover,
#reg-button:focus,
#reg-button:active,
#end-button:hover,
#end-button:focus,
#end-button:active {
  background-color: rgb(255, 165, 165);
}
.table-container {
  overflow-x: auto;
}

.table {
  font-size: 14px;
}

.b-table th,
.b-table td {
  vertical-align: middle;
}

.b-table th {
  font-weight: bold;
  background-color: #f5f5f5;
  color: #333333;
  border-color: #dddddd;
}

.b-table td {
  background-color: #ffffff;
  color: #333333;
  border-color: #dddddd;
}

.b-table tbody tr:hover {
  background-color: #f8f8f8;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.create-button {
  font-weight: bold;
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

.write-modal {
  width: 100%;
  height: 50%;
  margin: 0;
  padding: 0;
}
</style>

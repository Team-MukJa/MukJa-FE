<template>
  <div class="main-container">
    <div class="header" style="color: black">
      <h2 class="mb-4">공지사항</h2>
    </div>
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
        <!-- 테이블 셀 스타일 수정 -->
        <template #cell(id)="row">
          <div class="cell-value">{{ row.value }}</div>
        </template>
        <template #cell(subject)="row">
          <div class="cell-value">{{ row.value }}</div>
        </template>
        <template #cell(userId)="row">
          <div class="cell-value">{{ row.value }}</div>
        </template>
        <template #cell(hit)="row">
          <div class="cell-value">{{ row.value }}</div>
        </template>
        <template #cell(registerTime)="row">
          <div class="cell-value">{{ row.value }}</div>
        </template>
      </b-table>
    </div>
    <div class="button-container">
      <b-button variant="primary" @click="openModal" class="regist-button">
        게시글 작성
      </b-button>
      <b-modal
        v-model="showModal"
        title="게시글 작성"
        @hide="resetForm"
        class="write-modal"
        hide-footer
      >
        <!-- 폼 내부 스타일 수정 -->
        <b-form-group label="제목" label-cols-sm="3" label-cols-lg="2">
          <b-form-input
            class="custom-input"
            v-model="article.subject"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="작성자" label-cols-sm="3" label-cols-lg="2">
          <b-form-input
            class="custom-input"
            v-model="article.userId"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="내용" label-cols-sm="3" label-cols-lg="2">
          <b-form-textarea
            class="custom-input"
            v-model="article.content"
            rows="10"
          ></b-form-textarea>
        </b-form-group>
        <div class="button-group">
          <!-- 버튼 스타일 수정 -->
          <b-button variant="dark" class="mr-2" @click="registArticle">
            작성
          </b-button>
          <b-button variant="dark" @click="hideModal"> 취소 </b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<!-- 스타일 수정 -->
<style scoped>
.main-container {
  padding: 10px 0;
  height: 75vh;
  width: 150vh;
  margin: 50px;
  font-family: "Arial", sans-serif;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.header {
  padding: 20px;
  margin-bottom: 20px;
}

.table-container {
  height: 75vh;
  width: 150vh;
  overflow-x: auto;
}

.table {
  font-size: 14px;
}

.cell-value {
  padding: 10px 15px;
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

.regist-button {
  background-color: #000000;
  border-color: #000000;
  color: #ffffff;
}

.regist-button:hover,
.regist-button:focus,
.regist-button:active {
  background-color: #161617cc;
  border-color: #161617cc;
  color: #000000;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.b-form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
.write-modal {
  width: 100%;
  height: 50%;
  margin: 0;
  padding: 0;
}

.table-container {
  height: 75vh;
  width: 150vh;
  overflow-x: auto;
  scrollbar-color: #000000 #ffffff;
  scrollbar-width: thin;
}

.table-container::-webkit-scrollbar {
  width: 8px;
  background-color: #ffffff;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #000000;
}

.custom-input:focus {
  outline: none;
  border-color: gray;
  box-shadow: 0 0 5px gray;
}
</style>

<script>
import http from "@/util/http-common";
import { mapState, mapGetters } from "vuex";
const memberStore = "memberStore";

export default {
  name: "NoticeList",
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
      alert("글작성");
      http.post(`/notices`, param).then(({ data }) => {
        console.log(data);
        this.hideModal();
        this.$router.go(0);
      });
    },
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "noticelist" });
    },
  },
};
</script>

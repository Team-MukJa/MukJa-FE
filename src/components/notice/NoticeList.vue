<template>
  <div class="main-container">
    <div style="background-color: whitesmoke">
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
        <template #cell(id)="row">
          {{ row.value }}
        </template>
      </b-table>
    </div>
    <div class="button-container">
      <!-- <b-button class="create-button" variant="primary" @click="goWriteNotice">글 작성</b-button> -->
      <b-button variant="primary" @click="openModal">게시글 작성</b-button>
      <b-modal v-model="showModal" title="게시글 작성" @hide="resetForm" class="write-modal">
        <b-form-group label="제목">
          <b-form-input v-model="article.subject"></b-form-input>
        </b-form-group>
        <b-form-group label="작성자">
          <b-form-input v-model="article.userId"></b-form-input>
        </b-form-group>
        <b-form-group label="내용">
          <b-form-textarea v-model="article.content" rows="10"></b-form-textarea>
        </b-form-group>
        <div class="button-group">
          <b-button variant="primary" class="mr-2" @click="registArticle">작성</b-button>
          <b-button variant="secondary" @click="hideModal">취소</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
// import NoticeListItem from "@/components/notice/NoticeListItem";

export default {
  name: "NoticeList",
  components: {
    // NoticeListItem,
  },
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

      // 공지사항 작성
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
  },
  methods: {
    viewPost(item) {
      // 게시물 상세보기로 이동하는 메소드를 구현하세요
      const noticeId = item.noticeId;
      this.$router.push({ name: "noticeview", params: { noticeid: noticeId } });
    },

    // 글 작성 모달
    openModal() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },

    resetForm() {
      // 작성 취소 시 폼 초기화 메소드를 구현하세요
      this.article = {
        subject: "",
        userId: "",
        content: "",
      };
    },

    // 입력값 체크하기 - 체크가 성공하면 registArticle 호출
    // checkValue() {
    //   // 사용자 입력값 체크하기
    //   // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
    //   let err = true;
    //   let msg = "";
    //   !this.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.noticeId.focus());
    //   err &&
    //     !this.subject &&
    //     ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
    //   err &&
    //     !this.content &&
    //     ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

    //   if (!err) alert(msg);
    //   // 만약, 내용이 다 입력되어 있다면 registArticle 호출
    //   else this.registArticle();
    // },
    registArticle() {
      // 비동기
      // TODO : 글번호에 해당하는 글정보 등록.
      // alert("글작성 하러가자!!!!");
      const param = {
        userId: this.article.userId,
        subject: this.article.subject,
        content: this.article.content,
      };

      console.log(param);
      alert("글작성");
      http.post(`/notices`, param).then(({ data }) => {
        // let msg = "글작성 시 문제 발생";
        // if (data === "success") {
        //   msg = "글작성 성공!!";
        // }
        // alert(msg);
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
.main-container {
  margin: 20px;
  font-family: "Arial", sans-serif;
  background-color: whitesmoke;
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

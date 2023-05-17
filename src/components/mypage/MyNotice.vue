<template>
  <div class="main-container">
    <div class="table-container">
      <b-table
        class="table"
        striped
        hover
        :items="myNotice"
        :fields="fields"
        @row-clicked="viewPost"
        responsive
      >
        <template #cell(id)="row">
          {{ row.value }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "MyNotice",
  components: {},
  props: {
    myNotice: Array,
  },
  data() {
    return {
      message: "MyNotice",
      fields: [
        { key: "noticeId", label: "번호", sortable: true },
        { key: "subject", label: "제목", sortable: true },
        { key: "userId", label: "작성자", sortable: true },
        { key: "hit", label: "조회수", sortable: true },
        { key: "registerTime", label: "작성 시간", sortable: true },
      ],

      // 공지사항 작성
      showModal: false,
      article: {
        subject: null,
        userId: null,
        content: null,
      },
    };
  },
  created() {},
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
.card-container {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  row-gap: 10px;
  justify-content: center;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, minmax(100px, auto));
}
</style>

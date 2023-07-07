<template>
  <div class="regist">
    <h1>SSAFY 글 삭제</h1>
    <div>삭제중....</div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "NoticeDelete",
  data() {
    return {
      articleno: Number,
    };
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글을 삭제.
    this.articleno = this.$route.params.noticeid;
    console.log(this.articleno + "번글 삭제!!!!!");
    http.delete(`/notices/${this.articleno}`).then(({ data }) => {

      console.log(data);
      this.moveList();
    });
  },
  methods: {
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "noticelist" });
    },
  },
};
</script>

<style></style>

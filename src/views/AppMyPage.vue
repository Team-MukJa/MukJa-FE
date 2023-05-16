<template>
  <div>
    <h2>마이 페이지</h2>
    <b-card no-body>
      <b-tabs active-nav-item-class="font-weight-bold text-uppercase" content-class="mt-3">
        <b-tab title="나의 정보" active><my-user-detail :myData="myData"></my-user-detail></b-tab>
        <b-tab title="나의 핫플레이스"
          ><my-hot-place :myHotPlace="myHotPlace"></my-hot-place
        ></b-tab>
        <b-tab title="나의 문의사항"><my-notice :myNotice="myNotice"></my-notice></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import http from "@/util/http-common";

import MyUserDetail from "@/components/mypage/MyUserDetail.vue";
import MyHotPlace from "@/components/mypage/MyHotPlace.vue";
import MyNotice from "@/components/mypage/MyNotice.vue";

export default {
  name: "AppMyPage",
  components: {
    MyUserDetail,
    MyHotPlace,
    MyNotice,
  },
  props: {
    userid: String,
  },
  data() {
    return {
      myData: {},
      myHotPlace: [],
      myNotice: [],
    };
  },
  created() {
    http.get(`/my/user/${this.userid}`).then(({ data }) => {
      this.myData = data;
    });
    http.get(`/my/place/${this.userid}`).then(({ data }) => {
      this.myHotPlace = data;
    });
    http.get(`/my/notice/${this.userid}`).then(({ data }) => {
      this.myNotice = data;
    });
  },
  methods: {},
};
</script>

<style scoped></style>

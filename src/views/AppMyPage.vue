<template>
  <div>
    <b-tabs
      id="tab"
      class="justify-content-center"
      active-nav-item-class="font-weight-bold text-uppercase"
      fill
    >
      <b-tab title="나의 정보" active title-link-class="text-dark" style="margin-top: 50px"
        ><my-user-detail :myData="myData"></my-user-detail
      ></b-tab>
      <b-tab title="나의 핫플레이스" title-link-class="text-dark"
        ><my-hot-place style="margin-top: 50px" :myHotPlace="myHotPlace"></my-hot-place
      ></b-tab>
      <b-tab title="나의 문의사항" title-link-class="text-dark"
        ><my-notice style="margin-top: 50px" :myNotice="myNotice"></my-notice
      ></b-tab>
    </b-tabs>
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

<style scoped>
#tab {
  display: fixed;
  align-content: center;
  min-height: 100px;
  width: 1000px;
  max-height: 300px;
}
</style>
